import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/db/firebaseAdmin'

// ─── Constants ──────────────────────────────────────────────────────────────────
const COLLECTION = 'arambhaForm26'
const NOTIFY_TIMEOUT_MS = 5000
const ADMIN_ALERT_TIMEOUT_MS = 3000

// ─── Helpers ────────────────────────────────────────────────────────────────────
/** Validate fileUrl is from our trusted Firebase Storage bucket. */
function isValidFileUrl(url: string): boolean {
    try {
        const parsed = new URL(url)
        if (!parsed.hostname.endsWith('firebasestorage.googleapis.com')) return false
        const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        if (!bucket) return false
        return parsed.pathname.includes(`/v0/b/${bucket}/o/`)
    } catch {
        return false
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { formData, fileUrl } = body

        if (!formData || !fileUrl) {
            return NextResponse.json({ message: 'Missing required data' }, { status: 400 })
        }

        // Validate fileUrl comes from our Firebase Storage
        if (!isValidFileUrl(fileUrl)) {
            return NextResponse.json({ message: 'Invalid fileUrl' }, { status: 400 })
        }

        const { phone, email, fullName, ticketID } = formData

        if (!phone || !email || !fullName || !ticketID) {
            return NextResponse.json({ message: 'Missing required user fields' }, { status: 400 })
        }

        const { firestore } = await initAdmin()
        const origin = request.nextUrl.origin

        // 1. Verify duplicates — run phone + email queries in parallel
        const [phoneQuery, emailQuery] = await Promise.all([
            firestore.collection(COLLECTION).where('phone', '==', phone).limit(1).get(),
            firestore.collection(COLLECTION).where('email', '==', email).limit(1).get(),
        ])

        if (!phoneQuery.empty || !emailQuery.empty) {
            return NextResponse.json({ message: 'Phone or email already registered' }, { status: 409 })
        }

        // 2. Save to database
        const newRecord = {
            ...formData,
            fileUrl,
            emailSent: false,
            whatsappSent: false,
            createdAt: new Date().toISOString(),
        }

        const docRef = await firestore.collection(COLLECTION).add(newRecord)

        // 3. Send email + WhatsApp — each races its own 5s timeout independently.
        //    This way if email finishes at 4.8s and WhatsApp at 5.2s, email is marked
        //    as success and only WhatsApp is marked as failed.
        const abortController = new AbortController()

        type NotifyResult = { ok: boolean; error?: string }

        const withTimeout = (p: Promise<NotifyResult>): Promise<NotifyResult> =>
            new Promise((resolve) => {
                const timer = setTimeout(() => resolve({ ok: false, error: 'timeout' }), NOTIFY_TIMEOUT_MS)
                p.then((result) => {
                    clearTimeout(timer)
                    resolve(result)
                }).catch(() => {
                    clearTimeout(timer)
                    resolve({ ok: false, error: 'timeout' })
                })
            })

        const sendBrevo = async (): Promise<NotifyResult> => {
            return withTimeout(
                fetch(`${origin}/api/send-brevo-email`, {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fullName, email, ticketID, fileUrl }),
                })
                    .then(async (res) => {
                        if (!res.ok) return { ok: false, error: `http_${res.status}` }
                        return { ok: true }
                    })
                    .catch((err) => ({ ok: false, error: err.message || 'network_error' }))
            )
        }

        const sendWhatsapp = async (): Promise<NotifyResult> => {
            return withTimeout(
                fetch(`${origin}/api/send-pinnacle-whatsapp`, {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fullName, phoneNumber: phone, registrationId: ticketID, pdfUrl: fileUrl }),
                })
                    .then(async (res) => {
                        if (!res.ok) return { ok: false, error: `http_${res.status}` }
                        return { ok: true }
                    })
                    .catch((err) => ({ ok: false, error: err.message || 'network_error' }))
            )
        }

        const [emailResult, whatsappResult] = await Promise.all([sendBrevo(), sendWhatsapp()])

        const emailOk = emailResult.ok
        const whatsappOk = whatsappResult.ok

        // Only abort in-flight requests if at least one failed/timed out
        if (!emailOk || !whatsappOk) {
            abortController.abort()
        }

        if (!emailOk) console.error('[Register API] Email failed or timed out:', emailResult.error)
        if (!whatsappOk) console.error('[Register API] WhatsApp failed or timed out:', whatsappResult.error)

        // Update Firestore with accurate per-service status
        await docRef.update({ emailSent: emailOk, whatsappSent: whatsappOk })

        // Alert admin if either delivery didn't succeed — with its own 3s timeout
        if (!emailOk || !whatsappOk) {
            const adminEmail = process.env.ADMIN_EMAIL
            const resendApiKey = process.env.RESEND_API_KEY
            if (resendApiKey && adminEmail) {
                const alertController = new AbortController()
                try {
                    const alertTimeout = new Promise<'timeout'>((resolve) => {
                        setTimeout(() => resolve('timeout'), ADMIN_ALERT_TIMEOUT_MS)
                    })
                    const alertResult = await Promise.race([
                        fetch(`${origin}/api/send-email`, {
                            method: 'POST',
                            signal: alertController.signal,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: 'Admin Alert',
                                email: adminEmail,
                                ticketID: `ALERT: ${ticketID} | Email: ${emailOk ? '✅' : '❌'} (${emailResult.error || 'unknown'}) | WhatsApp: ${whatsappOk ? '✅' : '❌'} (${whatsappResult.error || 'unknown'})`,
                                fileUrl,
                            }),
                        }),
                        alertTimeout,
                    ])
                    if (alertResult === 'timeout') {
                        alertController.abort()
                        console.error('[Register API] Admin alert timed out')
                    }
                } catch (e) {
                    console.error('[Register API] Admin alert failed', e)
                }
            }
        }

        return NextResponse.json(
            {
                message: 'Registration successful',
                ticketID,
                notifications: { email: emailOk, whatsapp: whatsappOk },
            },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Error in /api/yoga-day-register:', error.message || error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

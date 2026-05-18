import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/db/firebaseAdmin'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { formData, collectionName, fileUrl } = body

        if (!formData || !collectionName || !fileUrl) {
            return NextResponse.json({ message: 'Missing required data' }, { status: 400 })
        }

        if (collectionName !== 'arambhaForm26') {
            return NextResponse.json({ message: 'Invalid collection' }, { status: 400 })
        }

        const { phone, email, fullName, ticketID } = formData

        if (!phone || !email || !fullName || !ticketID) {
            return NextResponse.json({ message: 'Missing required user fields' }, { status: 400 })
        }

        const { firestore } = await initAdmin()
        const origin = request.nextUrl.origin

        // 1. Verify duplicates — run phone + email queries in parallel
        const [phoneQuery, emailQuery] = await Promise.all([
            firestore.collection(collectionName).where('phone', '==', phone).limit(1).get(),
            firestore.collection(collectionName).where('email', '==', email).limit(1).get(),
        ])

        if (!phoneQuery.empty || !emailQuery.empty) {
            // For the fire-and-forget notification model, any existing record
            // (even with emailSent=false) is a valid registration. Block duplicates.
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

        const docRef = await firestore.collection(collectionName).add(newRecord)

        // 3. Send email + WhatsApp with a hard 5-second timeout.
        //    We await the race so Vercel doesn't kill the function mid-flight, but
        //    the user never waits more than 5s. AbortController cancels slow fetches.
        const NOTIFY_TIMEOUT_MS = 5000

        const abortController = new AbortController()
        const timeoutPromise = new Promise<'timeout'>((resolve) => {
            setTimeout(() => resolve('timeout'), NOTIFY_TIMEOUT_MS)
        })

        const raceResult = await Promise.race([
            Promise.allSettled([
                fetch(`${origin}/api/send-brevo-email`, {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fullName, email, ticketID, fileUrl }),
                }),
                fetch(`${origin}/api/send-pinnacle-whatsapp`, {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fullName, phoneNumber: phone, registrationId: ticketID, pdfUrl: fileUrl }),
                }),
            ]),
            timeoutPromise,
        ])

        // Resolve delivery status. Type-narrow first — timeout is not an array.
        let emailOk = false
        let whatsappOk = false

        if (raceResult === 'timeout') {
            // Cancel any in-flight requests so nothing leaks
            abortController.abort()
            console.error('[Register API] Notifications timed out after', NOTIFY_TIMEOUT_MS, 'ms')
        } else {
            // raceResult is PromiseSettledResult<Response>[]
            const [emailRes, whatsappRes] = raceResult
            emailOk = emailRes.status === 'fulfilled' && emailRes.value.ok
            whatsappOk = whatsappRes.status === 'fulfilled' && whatsappRes.value.ok

            if (!emailOk) console.error('[Register API] Email failed:', emailRes)
            if (!whatsappOk) console.error('[Register API] WhatsApp failed:', whatsappRes)
        }

        // Update Firestore with whatever we got
        await docRef.update({ emailSent: emailOk, whatsappSent: whatsappOk })

        // Alert admin if either delivery didn't succeed
        if (!emailOk || !whatsappOk) {
            const adminEmail = process.env.ADMIN_EMAIL
            const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY
            if (resendApiKey && adminEmail) {
                try {
                    await fetch(`${origin}/api/send-email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: 'Admin Alert',
                            email: adminEmail,
                            ticketID: `ALERT: ${ticketID} | Email: ${emailOk ? '✅' : '❌'} WhatsApp: ${whatsappOk ? '✅' : '❌'}`,
                            fileUrl,
                        }),
                    })
                } catch (e) {
                    console.error('[Register API] Admin alert failed', e)
                }
            }
        }

        return NextResponse.json({ message: 'Registration successful', ticketID }, { status: 200 })
    } catch (error: any) {
        console.error('Error in /api/yoga-day-register:', error.message || error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

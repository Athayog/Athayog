import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import FormSubmissionTemplate from '@/components/FormSubmissionTemplate'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { toEmail, formData, collectionName } = body

        if (!toEmail || !formData || !collectionName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Format the subject line nicely
        const formattedTitle = collectionName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str: string) => str.toUpperCase())

        const { data, error } = await resend.emails.send({
            from: 'AthayogLiving Forms <info@athayogliving.com>',
            to: [toEmail],
            subject: `New Submission: ${formattedTitle}`,
            react: FormSubmissionTemplate({ formData, collectionName }),
        })

        if (error) {
            console.error('Resend API error:', error)
            return NextResponse.json({ error }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error('Error handling form submission:', err)
        return NextResponse.json({ error: 'Invalid request body or server error' }, { status: 500 })
    }
}

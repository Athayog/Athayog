import BroadcastTemplate from '@/components/BroadcastTemplate';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {

            email,

        } = body;

        console.log('Received body:', body);

        if (!email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'AthayogLiving <info@athayogliving.com>',
            to: [email],
            subject: `YOGA ĀRAMBHA 2025 – FINAL REMINDER`,
            react: BroadcastTemplate({}),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('Error in sending email:', err);
        return NextResponse.json({ error: 'Invalid request body or server error' }, { status: 500 });
    }
}

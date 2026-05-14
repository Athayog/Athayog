/**
 * POST /api/send-brevo-email
 *
 * Sends the Yoga Arambha registration confirmation email via the Brevo
 * (formerly Sendinblue) Transactional Email API using the @getbrevo/brevo SDK.
 *
 * Sends the same content as the existing Resend route:
 *  - HTML body matching EmailTemplate (name, ticketID, event details)
 *  - PDF ticket attached from the public fileUrl
 *
 * Expected request body:
 * {
 *   name:      string  – registrant's name
 *   email:     string  – recipient email address
 *   ticketID:  string  – unique registration / ticket ID
 *   fileUrl:   string  – publicly accessible URL to the PDF ticket
 * }
 *
 * Environment variable required (server-side only):
 *   BREVO_API_KEY  – your Brevo API v3 key
 */

import { NextRequest, NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

// ── HTML email body (mirrors EmailTemplate.tsx) ─────────────────────────────────
function buildHtmlBody(name: string, ticketID: string): string {
    return `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
  <div style="display: flex; gap: 10px; margin-bottom: 16px;">
    <img height="60" width="60"
      src="https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/ar24_logo.png?alt=media&token=a3971691-5c65-4467-92ab-42580d3ed5cd"
      alt="Yoga Arambha logo" />
    <img height="60" width="60"
      src="https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/LogoFilled.jpg?alt=media&token=2e593810-bb55-4340-8614-f8052f8f63fa"
      alt="Athayog logo" />
  </div>

  <h2>Namaste ${name},</h2>

  <p>
    Thank you for registering for the <strong>Yoga Arambha 2026</strong> with Athayog, in association with
    <strong>Shri P.C. Mohan</strong>, Member of Parliament, Bengaluru Central and <strong>Shri Tejasvi Surya</strong>, Member of Parliament, Bengaluru South. 🙏
  </p>

  <p>
    We're honored to have your presence as we unite to celebrate yoga, wellness, and
    collective harmony on <strong>June 21st</strong>.
  </p>

  <p><strong>Here are your registration details:</strong></p>

  <p>
    📅 <strong>Event:</strong> International Day of Yoga 2026<br />
    📍 <strong>Venue:</strong> Indiranagar Club, Bengaluru<br />
    🕒 <strong>Timing:</strong> 6:00 AM onwards
  </p>

  <p>🔐 <strong>Registration ID:</strong> ${ticketID}</p>

  <p>Your unique QR code is attached. Please present it at the registration counter for a seamless check-in experience.</p>
  <p><strong>👇 Your Entry Pass PDF is attached to this email.</strong></p>

  <p><strong>Important Notes:</strong></p>
  <ul>
    <li>Please arrive 15 minutes early to avoid queues.</li>
    <li>Wear comfortable yoga attire and bring your own mat.</li>
    <li>Follow us on Instagram for updates and sneak peeks!</li>
  </ul>

  <p>
    If you have any questions, feel free to reach out at
    <a href="mailto:info@athayogliving.com">info@athayogliving.com</a> or
    WhatsApp us at <a href="tel:+919535689394">+91 95356 89394</a>.
  </p>

  <p>We can't wait to see you on the mat!</p>
  <p>With gratitude,<br /><strong>Team Athayog</strong></p>
</div>
  `.trim();
}

// ── Route handler ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    // 1. Parse body
    let body: { name?: string; email?: string; ticketID?: string; fileUrl?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const { name, email, ticketID, fileUrl } = body;

    if (!name || !email || !ticketID || !fileUrl) {
        return NextResponse.json(
            { error: 'Missing required fields: name, email, ticketID, fileUrl.' },
            { status: 400 }
        );
    }

    // 2. Validate env
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error('[Brevo] BREVO_API_KEY is not configured.');
        return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    // 3. Fetch the PDF and convert to base64 for attachment
    let pdfBase64: string;
    try {
        const pdfRes = await fetch(fileUrl);
        if (!pdfRes.ok) {
            throw new Error(`PDF fetch failed with status ${pdfRes.status}`);
        }
        const pdfBuffer = await pdfRes.arrayBuffer();
        pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    } catch (err: any) {
        console.error('[Brevo] Failed to fetch PDF:', err.message);
        return NextResponse.json(
            { error: 'Failed to fetch PDF ticket for attachment.' },
            { status: 502 }
        );
    }

    // 4. Configure Brevo client (new SDK: BrevoClient)
    const client = new BrevoClient({ apiKey });

    // 5. Send transactional email
    try {
        const response = await client.transactionalEmails.sendTransacEmail({
            sender: { name: 'AthayogLiving', email: 'info@athayogliving.com' },
            to: [{ email, name }],
            subject: `You're All Set for Yoga Arambha 2025 with Athayog!`,
            htmlContent: buildHtmlBody(name, ticketID),
            attachment: [
                {
                    content: pdfBase64,
                    name: `${ticketID}.pdf`,
                },
            ],
        });

        console.log('[Brevo] ✅ Email sent successfully:', response);
        return NextResponse.json({ success: true, data: response });
    } catch (err: any) {
        const status = err?.response?.status ?? err?.statusCode;
        const errBody = err?.response?.body ?? err?.message;
        console.error(`[Brevo] ❌ Failed to send email (${status}):`, errBody);

        if (status === 401) {
            return NextResponse.json(
                { error: 'Brevo authentication failed. Check BREVO_API_KEY.' },
                { status: 401 }
            );
        }
        if (status === 400) {
            return NextResponse.json(
                { error: 'Brevo rejected the request.', detail: errBody },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to send email via Brevo.', detail: errBody },
            { status: 500 }
        );
    }
}

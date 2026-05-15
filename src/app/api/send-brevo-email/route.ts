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
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your registration is confirmed. Download your QR pass and get ready to celebrate International Day of Yoga 2026.
  </div>
  
  <div style="display: flex; gap: 10px; margin-bottom: 16px;">
    <img height="60" width="60"
      src="https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/ar24_logo.png?alt=media&token=a3971691-5c65-4467-92ab-42580d3ed5cd"
      alt="Yoga Arambha logo" />
    <img height="60" width="60"
      src="https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/LogoFilled.jpg?alt=media&token=2e593810-bb55-4340-8614-f8052f8f63fa"
      alt="Athayog logo" />
  </div>

  <h2>Namaste ${name}, 🙏</h2>

  <p>
    Thank you for registering for <strong>Yoga Arambha 2026 – International Day of Yoga Celebration</strong>, organized by Athayog.
  </p>

  <p>
    We are delighted to have you join us as we come together to celebrate wellness, mindfulness, and the spirit of yoga through one of Bengaluru’s largest community yoga gatherings.
  </p>

  <p><strong>Here are your registration details:</strong></p>

  <p>
    📅 <strong>Event:</strong> Yoga Arambha 2026 – International Day of Yoga<br />
    📍 <strong>Venue:</strong> Indiranagar Club, Bengaluru<br />
    🕒 <strong>Reporting Time:</strong> 6:00 AM onwards<br />
    🧘 <strong>Mass Yoga Session:</strong> 7:00 AM – 8:30 AM<br />
    🧾 <strong>Registration ID:</strong> ${ticketID}
  </p>

  <p>Your unique QR code is attached below. Kindly present it at the registration counter for seamless check-in.</p>
  <p><strong>👇 Your Entry Pass PDF is attached to this email.</strong></p>

  <h3>Special Guests & Dignitaries</h3>
  <p>
    <strong>Presided by:</strong> Shri P. C. Mohan, Hon’ble Member of Parliament<br />
    <strong>Chief Guest:</strong> Shri Tejasvi Surya, Hon’ble Member of Parliament<br />
    <strong>Guest of Honour:</strong> Shri B.N.S. Reddy (Ex-IPS), President – Indiranagar Club
  </p>

  <h3>Important Instructions:</h3>
  <ul style="list-style-type: none; padding-left: 0;">
    <li>✅ Arrive at sharp 6:00 am for check in.</li>
    <li>✅ Wear comfortable yoga attire</li>
    <li>✅ Carry your yoga mat & water bottle</li>
    <li>✅ Present your QR code at the registration desk</li>
    <li>✅ Complimentary T-shirt, refreshments & saplings will be provided</li>
  </ul>

  <p>
    For any assistance, please contact:<br />
    📧 <a href="mailto:info@athayogliving.com">info@athayogliving.com</a><br />
    📞 <a href="tel:+918690333111">+91 8690333111</a>
  </p>

  <p>We look forward to celebrating International Day of Yoga with you.</p>

  <p>With gratitude,<br /><strong>Team Athayog</strong><br /><a href="https://www.athayogliving.com">www.athayogliving.com</a></p>
</div>
  `.trim();
}

// Allow-list trusted hosts for ticket PDF retrieval
const ALLOWED_PDF_HOSTS = new Set<string>([
    'firebasestorage.googleapis.com',
]);

function validateAndNormalizePdfUrl(input: string): string | null {
    try {
        const url = new URL(input);

        if (url.protocol !== 'https:') return null;
        if (url.username || url.password) return null;
        if (!ALLOWED_PDF_HOSTS.has(url.hostname)) return null;

        // Enforce Firebase Storage object endpoint for the expected bucket.
        const requiredPrefix = '/v0/b/authentication-test-7c342.appspot.com/o/';
        if (!url.pathname.startsWith(requiredPrefix)) return null;

        // Validate object key and file type.
        const encodedObjectPath = url.pathname.slice(requiredPrefix.length);
        if (!encodedObjectPath) return null;
        const objectPath = decodeURIComponent(encodedObjectPath);
        if (!objectPath.toLowerCase().endsWith('.pdf')) return null;
        if (objectPath.includes('..')) return null;

        // Only allow expected query params for Firebase media download links.
        const allowedParams = new Set(['alt', 'token']);
        for (const key of url.searchParams.keys()) {
            if (!allowedParams.has(key)) return null;
        }
        if (url.searchParams.get('alt') !== 'media') return null;

        return url.toString();
    } catch {
        return null;
    }
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

    const safeFileUrl = validateAndNormalizePdfUrl(fileUrl);
    if (!safeFileUrl) {
        return NextResponse.json(
            { error: 'Invalid fileUrl. Only HTTPS PDF URLs from trusted hosts are allowed.' },
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
        const pdfRes = await fetch(safeFileUrl);
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
            subject: `Your registration is confirmed. Download your QR pass and get ready to celebrate International Day of Yoga 2026.`,
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

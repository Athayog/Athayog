import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: Request) {
  try {
    const { name, ticketId, qrDataUrl } = await req.json()

    if (!name || !ticketId || !qrDataUrl) {
      return new NextResponse(JSON.stringify({ error: 'Missing parameters' }), { status: 400 })
    }

    // HTML content with inline styles, emojis, and embedded QR code image
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            color: #222;
          }
          h1, h3, h4 {
            margin: 0 0 10px 0;
          }
          p {
            font-size: 14px;
            line-height: 1.5;
          }
          .emoji {
            font-size: 18px;
          }
          .important {
            font-weight: bold;
            margin-top: 20px;
          }
          ul {
            margin-left: 20px;
          }
          .qr-code {
            margin-top: 30px;
            width: 150px;
            height: 150px;
          }
        </style>
      </head>
      <body>
        <h3>Namaste ${name} <span class="emoji">🙏</span></h3>
        <p>Thank you for registering for the International Day of Yoga 2025 with Athayog,<br/>
        in association with Shri Tejasvi Surya, Member of Parliament, Bengaluru South. <span class="emoji">🙏</span></p>
        
        <p>We’re honored to have your presence as we unite to celebrate yoga, wellness, and collective harmony on June 21st.</p>
        
        <h4>Here are your registration details:</h4>
        <p>📅 <b>Event:</b> International Day of Yoga 2025<br/>
        📍 <b>Venue:</b> Kittur Rani Chennamma stadium, Jaynagar<br/>
        🕒 <b>Timing:</b> 6:00 am Onwards.</p>

        <p>🔐 <b>Registration ID:</b> ${ticketId}</p>

        <p>Your unique QR code is attached below. Please present it at the registration counter for a seamless check-in experience.</p>

        <img src="${qrDataUrl}" alt="QR Code" class="qr-code" />

        <p class="important">Important Notes:</p>
        <ul>
          <li>Please arrive 15 minutes early to avoid queues.</li>
          <li>Wear comfortable yoga attire and bring your own mat.</li>
          <li>Follow us on Instagram for updates and sneak peeks! 📸</li>
        </ul>

        <p>If you have any questions, feel free to reach out at info@athayogliving.com or WhatsApp us at +91 9535689394.</p>

        <p>We can’t wait to see you on the mat! <span class="emoji">🧘</span></p>

        <p>With gratitude, <br/><strong>Team Athayog <span class="emoji">🙏</span></strong></p>
      </body>
    </html>
  `

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    // Set page content to your HTML string
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' },
    })

    await browser.close()

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="entry-pass.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 })
  }
}

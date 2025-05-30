import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(req) {
    try {
        const { name, ticketId, qrDataUrl } = await req.json();

        if (!name || !ticketId || !qrDataUrl) {
            return new NextResponse(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
        }

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();

        // Add a blank page
        const page = pdfDoc.addPage([595, 842]); // A4 size in points (approx 8.3 x 11.7 inches)

        const { width, height } = page.getSize();

        // Load fonts
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Set some styling constants
        const fontSizeTitle = 24;
        const fontSizeBody = 12;
        const margin = 50;

        // Draw title
        page.drawText(`Namaste ${name} 🙏`, {
            x: margin,
            y: height - margin - fontSizeTitle,
            size: fontSizeTitle,
            font: fontBold,
            color: rgb(0.1, 0.1, 0.1),
        });

        // Draw body text
        const bodyText = [
            'Thank you for registering for the International Day of Yoga 2025 with Athayog,',
            'in association with Shri Tejasvi Surya, Member of Parliament, Bengaluru South. 🙏',
            '',
            'We’re honored to have your presence as we unite to celebrate yoga, wellness, and collective harmony on June 21st.',
            '',
            'Here are your registration details:',
            `Event: International Day of Yoga 2025`,
            'Venue: Kittur Rani Chennamma stadium, Jaynagar',
            'Timing: 6:00 am Onwards.',
            '',
            `Registration ID: ${ticketId}`,
            '',
            'Please present your unique QR code below at the registration counter for a seamless check-in experience.',
            '',
            'Important Notes:',
            '• Please arrive 15 minutes early to avoid queues.',
            '• Wear comfortable yoga attire and bring your own mat.',
            '• Follow us on Instagram for updates and sneak peeks! 📸',
            '',
            'For questions: info@athayogliving.com or WhatsApp at +91 9535689394.',
            '',
            'We can’t wait to see you on the mat! 🧘',
            '',
            'With gratitude,',
            'Team Athayog 🙏',
        ];

        let textY = height - margin - fontSizeTitle - 40;
        const lineHeight = fontSizeBody + 5;

        for (const line of bodyText) {
            page.drawText(line, {
                x: margin,
                y: textY,
                size: fontSizeBody,
                font,
                color: rgb(0.2, 0.2, 0.2),
            });
            textY -= lineHeight;
        }

        // Embed the QR code image (base64 PNG)
        const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        const qrDims = qrImage.scale(1); // scale 1:1
        const qrSize = 150;
        page.drawImage(qrImage, {
            x: width - margin - qrSize,
            y: margin + 20,
            width: qrSize,
            height: qrSize,
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        return new NextResponse(Buffer.from(pdfBytes), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="entry-pass.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
    }
}

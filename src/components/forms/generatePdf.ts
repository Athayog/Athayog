import jsPDF from 'jspdf';
import './NotoSans-Regular-normal.js';

export async function generatePDFBlob({ name, ticketId, qrDataUrl }: { name: string; ticketId: string; qrDataUrl: string }) {
    const width = 140;
    const height = 60;
    const paddingLeft = 12;
    const paddingRight = 12;
    const qrSize = 38;
    const lineHeight = 6;

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [width, height],
    });

    // Title bold
    doc.setFont('NotoSans-Regular', 'bold');
    doc.setFontSize(16);
    const title = 'Athayog Yoga Day 2025';

    // Lines before date
    const lines = [
        `${name}`,
        `${ticketId}`,
    ];

    // Date & Location smaller font
    const dateLocation = 'June 21, 6:00 AM';

    // Venue text split if needed (manually)
    const venue = 'Kittur Rani Chennamma Stadium, Jayanagar';
    const maxVenueLength = 55;
    const venueLines = [];
    if (venue.length > maxVenueLength) {
        let splitIndex = venue.lastIndexOf(' ', maxVenueLength);
        venueLines.push(venue.slice(0, splitIndex));
        venueLines.push(venue.slice(splitIndex + 1));
    } else {
        venueLines.push(venue);
    }

    // Combine all lines for height calculation
    const allLines = [title, ...lines, dateLocation, ...venueLines];

    // Calculate total text block height
    const totalTextHeight = allLines.length * lineHeight;

    // Starting Y to center text vertically
    let startY = (height - totalTextHeight) / 2 + lineHeight / 2;

    // Draw title (bold)
    doc.setFont('NotoSans-Regular', 'bold');
    doc.setFontSize(16);
    doc.text(title, paddingLeft, startY);
    startY += lineHeight;

    // Draw name and ticketId (normal font size 12)
    doc.setFont('NotoSans-Regular', 'normal');
    doc.setFontSize(12);
    for (let i = 0; i < lines.length; i++) {
        doc.text(lines[i], paddingLeft, startY);
        startY += lineHeight;
    }

    // Draw Date & Location smaller font size 10
    doc.setFontSize(10);
    doc.text(dateLocation, paddingLeft, startY);
    startY += lineHeight;

    // Draw venue lines (font size 10)
    venueLines.forEach(line => {
        doc.text(line, paddingLeft, startY);
        startY += lineHeight;
    });

    // Add QR code, vertically centered on right
    if (qrDataUrl) {
        const img = new Image();
        img.src = qrDataUrl;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        const qrX = width - paddingRight - qrSize;
        const qrY = (height - qrSize) / 2;
        doc.addImage(img, 'PNG', qrX, qrY, qrSize, qrSize);
    }

    return doc.output('blob');
}

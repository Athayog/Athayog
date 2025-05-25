import { QRCodeSVG } from 'qrcode.react';
import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    ticketID: string;
    eventSource: string;
    location: string;
    phone: string;
    tShirtSize: string;
    gender: string;
    age: string;
    experience: string;
    qrDataUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    ticketID,
    eventSource,
    location,
    phone,
    tShirtSize,
    gender,
    age,
    experience,
    qrDataUrl
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6 }}>
        <h2>🧘‍♂️ Thank you for registering, {name}!</h2>
        <p>We're excited to have you join us for the International Yoga Day event. Here are your ticket details:</p>

        {qrDataUrl && (
            <img
                src={qrDataUrl}
                alt="Ticket QR Code"
                width={128}
                height={128}
                style={{ margin: '20px 0' }}
            />
        )}
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
            <tbody>
                <tr>
                    <td style={cellStyle}><strong>Ticket ID</strong></td>
                    <td style={cellStyle}>ATH-{ticketID}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Name</strong></td>
                    <td style={cellStyle}>{name}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Phone</strong></td>
                    <td style={cellStyle}>{phone}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Location</strong></td>
                    <td style={cellStyle}>{location}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Age</strong></td>
                    <td style={cellStyle}>{age}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Gender</strong></td>
                    <td style={cellStyle}>{gender}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>T-Shirt Size</strong></td>
                    <td style={cellStyle}>{tShirtSize}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Experience</strong></td>
                    <td style={cellStyle}>{experience}</td>
                </tr>
                <tr>
                    <td style={cellStyle}><strong>Event Source</strong></td>
                    <td style={cellStyle}>{eventSource}</td>
                </tr>
            </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>
            Please bring this ticket (printed or on your phone) when attending the event.
        </p>

        <p>Namaste 🙏,<br />Athayog Team</p>
    </div>
);

const cellStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px 12px',
    textAlign: 'left',
};

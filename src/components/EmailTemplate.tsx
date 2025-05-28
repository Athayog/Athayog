import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    ticketID: string;
    location: string;
    qrDataUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    ticketID,
    location,
    qrDataUrl,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6 }}>
        <h2>Namaste {name},</h2>

        <p>
            Thank you for registering for the International Day of Yoga 2025 with Athayog,
            in association with Shri Tejasvi Surya, Member of Parliament, Bengaluru South. 🙏
        </p>

        <p>
            We’re honored to have your presence as we unite to celebrate yoga, wellness, and collective harmony on <strong>June 21st</strong>.
        </p>

        <p><strong>Here are your registration details:</strong></p>

        <p>📅 <strong>Event:</strong> International Day of Yoga 2025<br />
            📍 <strong>Venue:</strong> {location}<br />
            🕒 <strong>Timing:</strong> 6:00 AM onwards<br />
            🔐
        </p>
        <strong> 🔐 Registration ID:</strong> ATH-{ticketID}

        <p><strong>Important Notes:</strong></p>
        <ul>
            <li>Please arrive 15 minutes early to avoid queues.</li>
            <li>Wear comfortable yoga attire and bring your own mat.</li>
            <li>Follow us on Instagram for updates and sneak peeks!</li>
        </ul>

        <p>
            If you have any questions, feel free to reach out at <a href="mailto:info@athayogliving.com">info@athayogliving.com</a> or WhatsApp us at <a href="tel:+919535689394">+91 95356 89394</a>.
        </p>

        <p>We can’t wait to see you on the mat!</p>

        <p>With gratitude,<br />Team Athayog</p>
    </div>
);

import * as React from 'react';
import LogoFilled from '/public/images/LogoFilled.jpg'

interface EmailTemplateProps {
    name: string;
    ticketID: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    ticketID,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6 }}>
        <div style={{ display: 'flex' }}>
            <img height="60px" width="60px" src='https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/ar24_logo.png?alt=media&token=a3971691-5c65-4467-92ab-42580d3ed5cd' />
            <img height="60px" width="60px" src="https://firebasestorage.googleapis.com/v0/b/authentication-test-7c342.appspot.com/o/LogoFilled.jpg?alt=media&token=2e593810-bb55-4340-8614-f8052f8f63fa" />
        </div>
        <h2>Namaste {name},</h2>

        <p>
            Thank you for registering for the Yoga Arambha 2025 with Athayog, in association with Shri Tejasvi Surya, Member of Parliament, Bengaluru South. 🙏
        </p>

        <p>
            We’re honored to have your presence as we unite to celebrate yoga, wellness, and collective harmony on <strong>June 21st</strong>.
        </p>

        <p><strong>Here are your registration details:</strong></p>

        <p>📅 <strong>Event:</strong> International Day of Yoga 2025<br />
            📍 <strong>Venue:</strong> Kittur Rani Chennamma stadium, Jaynagar<br />
            🕒 <strong>Timing:</strong> 6:00 AM onwards<br />
            🔐
        </p>

        <p><strong> Registration ID:</strong> {ticketID}</p>

        <p>Your unique QR code is attached below. Please present it at the registration counter for a seamless check-in experience.</p>
        <p><strong>👇 Download Your Entry Pass (PDF)</strong></p>

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

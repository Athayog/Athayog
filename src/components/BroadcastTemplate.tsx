/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

const BroadcastTemplate: React.FC = () => {
    return (
        <div style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            fontSize: 16,
            lineHeight: 1.55,
            color: "#333",
        }}>
            <p>
                Namaste! 🙏<br />
                We’re all set to welcome you tomorrow for <strong>Yoga Ārambha – International Day of Yoga 2025</strong> 🌞
            </p>

            <p>
                📍 <strong>Venue:</strong> Kittur Rani Chennamma Stadium<br />
                📅 <strong>Date:</strong> 21st June 2025, Saturday
            </p>

            <p><strong>Important Instructions:</strong></p>
            <ul>
                <li>✅ Keep your <strong>QR code ticket</strong> ready for scanning at the registration desk</li>
                <li>🎁 Collect your <strong>goodie bag</strong> after registration</li>
                <li>🎟️ Wear your <strong>wristband at all times</strong> for access inside the stadium and refreshments</li>
                <li>👞 No Footwear allowed inside the practice area</li>
                <li>🚫 Please refrain from entering the synthetic track at the stadium (use the foot over bridge)</li>
            </ul>

            <p>
                🏃‍♂️ <strong>Marathon Participants:</strong> Arrive by <strong>5:30 AM</strong><br />
                🧘 <strong>Yoga Participants:</strong> Arrive by <strong>6:30 AM</strong>
            </p>

            <p><strong>🧘‍♀️ Things to carry:</strong></p>
            <ul>
                <li>✔️ Yoga mat</li>
                <li>✔️ Water bottle</li>
                <li>✔️ Hand towel</li>
            </ul>

            <p>
                Let’s come together for a morning full of energy, health, and community spirit! 🌅<br />
                <strong>See you on the mat!</strong>
            </p>

            <p>- Team Athayog Living</p>

            <img
                src="https://resend-attachments.s3.amazonaws.com/wyfJjoGOWzrx4bC"
                alt="Athayog Event Banner 1"
                style={{
                    maxWidth: 600,
                    borderRadius: 8,
                    marginTop: 20
                }}
            />
<br/>
                <img
                src="https://resend-attachments.s3.amazonaws.com/HzlJ40vsm0FnVpp"
                alt="Athayog Event Banner 2"
                style={{
                    maxWidth: 600,
                    borderRadius: 8,
                    marginTop: 10
                }}
            />
        </div>
    );
};

export default BroadcastTemplate;

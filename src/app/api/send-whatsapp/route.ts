// app/api/send-message/route.js (or .ts if using TypeScript)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, ticketId, media_url, phoneNumber } = await request.json();

    if (!name || !ticketId || !media_url || !phoneNumber) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const userid = '2000216557'
    const password = 'AYLvyasa@2020$$'
    const caption = `ATHAYOG | YOGA ARAMBHA 2025 CONFIRMATION

Namaste ${name} 🙏,

Thank you for registering for the International Day of Yoga 2025 with Athayog,
in association with Shri Tejasvi Surya, Member of Parliament – Bengaluru South.

📅 Date: June 21, 2025  
📍 Venue: Kittur Rani Chennamma stadium, Jaynagar  
🕒 Timing: 6:00 am onwards  
🧾 Registration ID: ${ticketId}

Your unique entry QR code and event pass are ready ✅  

Please Note  
✅ Bring your yoga mat & water bottle  
✅ Wear comfortable yoga attire  
✅ Arrive at least 15 minutes early  
✅ Show the QR code at the entry gate

Let’s come together to celebrate yoga, health & harmony 🌿

See you on the mat!  
Team Athayog`;



    const encodedCaption = encodeURIComponent(caption);
    const encodedMediaUrl = encodeURIComponent(media_url);
    const encodedFileName = encodeURIComponent(ticketId + "_Ticket")

    const fullUrl = `https://media.smsgupshup.com/GatewayAPI/rest?userid=${encodeURIComponent(userid)}&password=${encodeURIComponent(password)}&send_to=${encodeURIComponent(phoneNumber)}&v=1.1&format=json&msg_type=DOCUMENT&method=SENDMEDIAMESSAGE&caption=${encodedCaption}&media_url=${encodedMediaUrl}&filename=${encodedFileName}`;


    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            redirect: 'follow',
        });

        const text = await response.text();

        return NextResponse.json({ result: text });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch message API' }, { status: 500 });
    }
}

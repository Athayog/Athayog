// app/api/send-whatsapp-message/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phoneNumber, message } = body;

        // Retrieve Gupshup API Key from environment variables
        const gupshupApiKey = ''

        // Basic validation
        if (!gupshupApiKey) {
            return NextResponse.json(
                { success: false, message: 'Gupshup API Key is not configured in environment variables.' },
                { status: 500 }
            );
        }

        if (!phoneNumber || !message) {
            return NextResponse.json(
                { success: false, message: 'Phone number and message are required in the request body.' },
                { status: 400 }
            );
        }

        // NEW API ENDPOINT from https://docs.gupshup.io/reference/msg
        const gupshupApiUrl = 'https://api.gupshup.io/wa/api/v1/msg';

        // Construct URL-encoded form data for the new API
        const params = new URLSearchParams();
        params.append('channel', 'whatsapp'); // Specify channel as whatsapp
        params.append('source', 'YOUR_WHATSAPP_BUSINESS_PHONE_NUMBER'); // Your registered WhatsApp Business Phone Number (e.g., 91XXXXXXXXXX)
        params.append('destination', phoneNumber); // Recipient's phone number
        params.append('message', JSON.stringify({ type: 'text', text: message })); // Message as JSON object
        // Note: The new documentation does not explicitly show a 'method' parameter like SendMessage for this endpoint.
        // Also, 'msg_type', 'isHSM', 'v', 'auth_scheme', 'format' are not used here.

        const gupshupResponse = await fetch(gupshupApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'apikey': gupshupApiKey, // API key in header
            },
            body: params.toString(),
        });

        const gupshupData = await gupshupResponse.json(); // Expected response: { "status": "submitted", "messageId": "uuid" }

        if (gupshupResponse.ok && gupshupData.status === 'submitted') { // Check for 'status' being 'submitted'
            console.log('WhatsApp message sent successfully:', gupshupData);
            return NextResponse.json(
                { success: true, message: 'WhatsApp message sent successfully!', gupshupResponse: gupshupData },
                { status: 200 }
            );
        } else {
            console.error('Failed to send WhatsApp message via Gupshup:', gupshupData);
            return NextResponse.json(
                {
                    success: false,
                    message: gupshupData.message || 'Failed to send WhatsApp message via Gupshup.', // Error message from Gupshup
                    gupshupResponse: gupshupData,
                },
                { status: gupshupResponse.status || 500 }
            );
        }
    } catch (error) {
        console.error('Error in send-whatsapp-message API route:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error processing WhatsApp message request.' },
            { status: 500 }
        );
    }
}
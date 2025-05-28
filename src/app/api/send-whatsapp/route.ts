import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Parse the request body as JSON
        const body = await request.json();
        const { phoneNumber, message } = body;

        // Retrieve Gupshup credentials from environment variables
        const gupshupUserId = ""
        const gupshupPassword = '';

        // Basic validation for credentials and incoming data
        if (!gupshupUserId || !gupshupPassword) {
            return NextResponse.json(
                { success: false, message: 'Gupshup API credentials are not configured in environment variables.' },
                { status: 500 }
            );
        }

        if (!phoneNumber || !message) {
            return NextResponse.json(
                { success: false, message: 'Phone number and message are required in the request body.' },
                { status: 400 }
            );
        }

        const gupshupApiUrl = 'https://mediaapi.smsgupshup.com/GatewayAPI/rest'; // Gupshup API Endpoint

        // Construct URL-encoded form data for the Gupshup API call
        const params = new URLSearchParams();
        params.append('method', 'sendMessage');
        params.append('userid', gupshupUserId); // Your Gupshup user ID
        params.append('password', gupshupPassword); // Your Gupshup password
        params.append('send_to', phoneNumber); // Recipient's phone number in E.164 format
        params.append('msg', encodeURIComponent(message)); // The text message, URL encoded
        params.append('msg_type', 'TEXT');
        params.append('isHSM', 'true'); // Indicates a pre-approved message template [cite: 22]
        params.append('v', '1.1'); // API version [cite: 22]
        params.append('auth_scheme', 'plain'); // Authentication scheme [cite: 22]
        params.append('format', 'json'); // API response format [cite: 22]

        // Make the POST request to the Gupshup API
        const gupshupResponse = await fetch(gupshupApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(), // Send the URL-encoded parameters
        });

        const gupshupData = await gupshupResponse.json(); // Gupshup API returns JSON for 'format=json'

        // Check Gupshup's response status
        if (gupshupResponse.ok && gupshupData.response?.status === 'success') {
            console.log('WhatsApp message sent successfully:', gupshupData);
            return NextResponse.json(
                { success: true, message: 'WhatsApp message sent successfully!', gupshupResponse: gupshupData.response },
                { status: 200 }
            );
        } else {
            console.error('Failed to send WhatsApp message via Gupshup:', gupshupData);
            return NextResponse.json(
                {
                    success: false,
                    message: gupshupData.response?.details || 'Failed to send WhatsApp message via Gupshup.',
                    errorCode: gupshupData.response?.id,
                    gupshupResponse: gupshupData,
                },
                { status: gupshupData.response?.id || 500 } // Use Gupshup's error code if available
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
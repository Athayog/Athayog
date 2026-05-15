import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { formData, collectionName, fileUrl } = body;

        if (!formData || !collectionName || !fileUrl) {
            return NextResponse.json({ message: 'Missing required data' }, { status: 400 });
        }

        const { phone, email, fullName, ticketID } = formData;

        if (!phone || !email || !fullName || !ticketID) {
            return NextResponse.json({ message: 'Missing required user fields' }, { status: 400 });
        }

        const { firestore } = await initAdmin();
        const origin = request.nextUrl.origin;

        // 1. Verify duplicates to prevent double-charging/registering if user double clicks
        const phoneQuery = await firestore.collection(collectionName).where('phone', '==', phone).limit(1).get();
        const emailQuery = await firestore.collection(collectionName).where('email', '==', email).limit(1).get();

        if (!phoneQuery.empty || !emailQuery.empty) {
             // If the existing record is valid (emailSent), block duplicate.
            // If emailSent is false, it might be an orphaned record, we could delete it, but let's just block it to be safe or follow previous duplicate logic.
            const existingDoc = !phoneQuery.empty ? phoneQuery.docs[0] : emailQuery.docs[0];
            if (existingDoc.data().emailSent !== false) {
                 return NextResponse.json({ message: 'Phone or email already registered' }, { status: 409 });
            } else {
                 // Delete stuck record and allow proceeding
                 await existingDoc.ref.delete();
            }
        }

        // 2. Save to database
        const newRecord = {
            ...formData,
            fileUrl,
            emailSent: false,
            whatsappSent: false,
            createdAt: new Date().toISOString()
        };

        const docRef = await firestore.collection(collectionName).add(newRecord);

        // 3. Send Email and WhatsApp sequentially/concurrently via local endpoints
        const [emailRes, whatsappRes] = await Promise.allSettled([
            fetch(`${origin}/api/send-brevo-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fullName, email, ticketID, fileUrl }),
            }),
            fetch(`${origin}/api/send-pinnacle-whatsapp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fullName, phoneNumber: phone, registrationId: ticketID, pdfUrl: fileUrl }),
            })
        ]);

        let emailSuccess = false;
        let whatsappSuccess = false;

        if (emailRes.status === 'fulfilled' && emailRes.value.ok) {
            emailSuccess = true;
        } else {
             console.error('[Register API] Email failed', emailRes);
        }

        if (whatsappRes.status === 'fulfilled' && whatsappRes.value.ok) {
            whatsappSuccess = true;
        } else {
             console.error('[Register API] WhatsApp failed', whatsappRes);
        }

        // 4. Update the DB with the status
        await docRef.update({
            emailSent: emailSuccess,
            whatsappSent: whatsappSuccess
        });

        if (!emailSuccess && !whatsappSuccess) {
            return NextResponse.json(
                { message: 'Registered, but failed to send both email and WhatsApp.', ticketID },
                { status: 206 } // Partial Content
            );
        } else if (!emailSuccess) {
             return NextResponse.json(
                { message: 'Registered, but failed to send email.', ticketID },
                { status: 206 }
            );
        } else if (!whatsappSuccess) {
             return NextResponse.json(
                { message: 'Registered, but failed to send WhatsApp.', ticketID },
                { status: 206 }
            );
        }

        return NextResponse.json({ message: 'Registration successful', ticketID }, { status: 200 });

    } catch (error: any) {
        console.error('Error in /api/yoga-day-register:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ticketID } = body;

        if (!ticketID || typeof ticketID !== 'string') {
            return NextResponse.json({ message: 'Missing or invalid ticketID' }, { status: 400 });
        }

        const { firestore } = await initAdmin();
        const collection = firestore.collection('arambhaForm26');
        const identifier = ticketID.trim();

        let ticketIDQuerySnapshot;

        if (identifier.includes('@')) {
            // Treat as email
            ticketIDQuerySnapshot = await collection.where('email', '==', identifier.toLowerCase()).limit(1).get();
        } else if (identifier.toUpperCase().startsWith('ATH-')) {
            // Treat as ticketID
            ticketIDQuerySnapshot = await collection.where('ticketID', '==', identifier.toUpperCase()).limit(1).get();
        } else {
            // Treat as phone number
            // First try direct match
            ticketIDQuerySnapshot = await collection.where('phone', '==', identifier).limit(1).get();
            
            // If empty and it doesn't have a '+', try appending '+91'
            if (ticketIDQuerySnapshot.empty && !identifier.startsWith('+')) {
                ticketIDQuerySnapshot = await collection.where('phone', '==', '+91' + identifier).limit(1).get();
            }
        }

        if (ticketIDQuerySnapshot.empty) {
            return NextResponse.json({ message: 'Ticket not found for the provided details' }, { status: 404 });
        }

        // Return the document data
        const docData = ticketIDQuerySnapshot.docs[0].data();

        return NextResponse.json({ message: 'User found', data: docData }, { status: 200 });

    } catch (error: any) {
        console.error('Error checking registration:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

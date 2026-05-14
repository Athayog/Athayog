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

        const ticketIDQuerySnapshot = await firestore
            .collection('arambhaForm26')
            .where('ticketID', '==', ticketID)
            .limit(1)
            .get();

        if (ticketIDQuerySnapshot.empty) {
            return NextResponse.json({ message: 'ticketID not found' }, { status: 404 });
        }

        const doc = ticketIDQuerySnapshot.docs[0];
        await doc.ref.update({ emailSent: true });

        return NextResponse.json({ message: 'Email status updated' }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating email status:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

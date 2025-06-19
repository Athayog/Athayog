import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const ticketId = body.ticketId;

        if (!ticketId || typeof ticketId !== 'string') {
            return NextResponse.json({ message: 'Invalid or missing ticketId' }, { status: 400 });
        }

        const { firestore, fieldValue } = await initAdmin();

        const querySnapshot = await firestore
            .collection('arambhaForm25')
            .where('ticketID', '==', ticketId)
            .limit(1)
            .get();

        if (querySnapshot.empty) {
            return NextResponse.json({ message: 'Ticket not found or invalid' }, { status: 404 });
        }

        const doc = querySnapshot.docs[0];
        const userData = doc.data();
        const docRef = doc.ref;

        // Atomically increment the scanned field
        await docRef.update({ scanned: fieldValue.increment(1) });

        return NextResponse.json(
            {
                message: 'Ticket verified successfully. Entry allowed.',
                user: { ...userData, scanned: (userData.scanned || 0) + 1 }, // for response clarity
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error verifying ticket:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

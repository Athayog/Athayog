import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized: Missing token' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];
        const { auth, firestore, fieldValue } = await initAdmin();

        try {
            const decodedToken = await auth.verifyIdToken(token);
            const email = decodedToken.email || '';
            const phone = decodedToken.phone_number || '';

            if (!email.includes('athayogliving.com') && !phone.includes('+918971613155')) {
                return NextResponse.json({ message: 'Forbidden: Employee access required' }, { status: 403 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        const body = await request.json();
        const ticketId = body.ticketId;

        if (!ticketId || typeof ticketId !== 'string') {
            return NextResponse.json({ message: 'Invalid or missing ticketId' }, { status: 400 });
        }

        const querySnapshot = await firestore
            .collection('arambhaForm26')
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

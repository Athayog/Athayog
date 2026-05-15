import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, email } = body;

        if (!phone || !email || typeof phone !== 'string' || typeof email !== 'string') {
            return NextResponse.json({ message: 'Missing or invalid phone/email' }, { status: 400 });
        }

        const { firestore } = await initAdmin();

        // Query if phone OR email already exists in 'arambhaForm25' collection
        // Firestore doesn't support OR queries directly, so do two queries and combine results

        const phoneQuerySnapshot = await firestore
            .collection('arambhaForm26')
            .where('phone', '==', phone)
            .limit(1)
            .get();

        if (!phoneQuerySnapshot.empty) {
            const doc = phoneQuerySnapshot.docs[0];
            const data = doc.data();
            if (data.emailSent === false) {
                // Delete stuck record and allow proceeding
                await doc.ref.delete();
            } else {
                return NextResponse.json({ message: 'Phone number already registered', ticketID: data.ticketID }, { status: 409 });
            }
        }

        const emailQuerySnapshot = await firestore
            .collection('arambhaForm26')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!emailQuerySnapshot.empty) {
            const doc = emailQuerySnapshot.docs[0];
            const data = doc.data();
            if (data.emailSent === false) {
                // Delete stuck record and allow proceeding
                await doc.ref.delete();
            } else {
                return NextResponse.json({ message: 'Email already registered', ticketID: data.ticketID }, { status: 409 });
            }
        }

        // If both not found, user not registered
        return NextResponse.json({ message: 'User not registered, you can proceed' }, { status: 200 });

    } catch (error: any) {
        console.error('Error checking registration:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

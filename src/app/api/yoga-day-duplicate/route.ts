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
            .collection('arambhaForm25')
            .where('phone', '==', phone)
            .limit(1)
            .get();

        if (!phoneQuerySnapshot.empty) {
            return NextResponse.json({ message: 'Phone number already registered' }, { status: 409 });
        }

        const emailQuerySnapshot = await firestore
            .collection('arambhaForm25')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!emailQuerySnapshot.empty) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }

        // If both not found, user not registered
        return NextResponse.json({ message: 'User not registered, you can proceed' }, { status: 200 });

    } catch (error: any) {
        console.error('Error checking registration:', error.message || error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        console.log('Received error log request');
        // Get full error data from request body
        const errorData = await request.json();

        const { firestore } = await initAdmin();

        // Add new document to 'errorLogs' collection with a timestamp
        await firestore.collection('errorLogs').add({
            ...errorData,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'Error logged successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error logging error:', error.message || error);
        return NextResponse.json(
            { message: 'Failed to log error' },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/db/firebaseAdmin'

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId')
    const purchaseId = request.nextUrl.searchParams.get('purchaseId')

    if (!userId || !purchaseId) {
        return NextResponse.json({ message: 'Missing userId or purchaseId' }, { status: 400 })
    }

    const { firestore } = await initAdmin()

    try {
        const ref = firestore
            .collection('users')
            .doc(userId)
            .collection('courses')
            .doc(purchaseId)

        const doc = await ref.get()

        if (!doc.exists) {
            return NextResponse.json({ message: 'Purchase not found' }, { status: 404 })
        }

        return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 })
    } catch (error) {
        console.error('Error fetching purchase:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/db/firebaseAdmin'

const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET as string
    return crypto.createHmac('sha256', keySecret).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest('hex')
}

export async function POST(request: NextRequest) {
    const { firestore, fieldValue } = await initAdmin()

    const body = await request.json()
    const { orderId, razorpayPaymentId, razorpaySignature, notes } = body

    const signature = generatedSignature(orderId, razorpayPaymentId)
    if (signature !== razorpaySignature) {
        return NextResponse.json({ message: 'Payment verification failed', isOk: false }, { status: 400 })
    }

    try {
        const { userId, name, type, days, price } = notes
        await firestore
            .collection('users')
            .doc(userId)
            .collection('courses')
            .add({
                userfid: userId,
                name,
                type,
                days,
                price: parseFloat(price),
                paymentStatus: 'verified',
                createdAt: fieldValue.serverTimestamp(),
            })

        return NextResponse.json({ message: 'Payment verified successfully, course details saved.', isOk: true }, { status: 200 })
    } catch (error) {
        console.error('Error saving course details:', error)
        return NextResponse.json({ message: 'Error saving course details', isOk: false }, { status: 500 })
    }
}

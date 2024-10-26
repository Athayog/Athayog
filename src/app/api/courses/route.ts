import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/db/firebaseAdmin'

export async function GET(request: NextRequest) {
    // Get userId from query parameters or auth context (assuming you have auth in place)
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 })
    }

    const { firestore } = await initAdmin()

    try {
        const coursesSnapshot = await firestore.collection('users').doc(userId).collection('courses').get()
        const courses = coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        return NextResponse.json(courses, { status: 200 })
    } catch (error) {
        console.error('Error fetching courses:', error)
        return NextResponse.json({ message: 'Error fetching courses' }, { status: 500 })
    }
}

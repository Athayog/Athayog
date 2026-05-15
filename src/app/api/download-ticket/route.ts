import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    const fileName = searchParams.get('name') || 'ticket.pdf';

    if (!fileUrl) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Failed to fetch file');

        const blob = await response.blob();
        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
        headers.set('Content-Type', 'application/pdf');

        return new NextResponse(blob, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error('Download error:', error);
        return new NextResponse('Failed to download file', { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_DOWNLOAD_ORIGINS = new Set<string>([
    'https://example.com',
]);

function sanitizeFileName(name: string): string {
    return name.replace(/[\r\n"]/g, '_');
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    const fileName = sanitizeFileName(searchParams.get('name') || 'ticket.pdf');

    if (!fileUrl) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    let parsedUrl: URL;
    try {
        parsedUrl = new URL(fileUrl);
    } catch {
        return new NextResponse('Invalid URL', { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return new NextResponse('Invalid URL protocol', { status: 400 });
    }

    if (!ALLOWED_DOWNLOAD_ORIGINS.has(parsedUrl.origin)) {
        return new NextResponse('URL not allowed', { status: 400 });
    }

    try {
        const response = await fetch(parsedUrl.toString());
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

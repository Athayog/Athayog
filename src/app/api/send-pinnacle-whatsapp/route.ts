/**
 * POST /api/send-pinnacle-whatsapp
 *
 * Sends a WhatsApp registration ticket to the user via the Pinnacle Business API.
 * The message includes:
 *  - A PDF ticket attached as a document header
 *  - Body variables: {{1}} Name, {{2}} Registration ID
 *  - A "Visit" CTA button that routes through Pinnacle's tracking campaign
 *
 * Expected request body:
 * {
 *   phoneNumber:     string   – recipient number with country code (e.g. "+919876543210")
 *   name:            string   – registrant's name
 *   registrationId:  string   – unique ticket / registration ID
 *   pdfUrl:          string   – publicly accessible URL to the user's PDF ticket
 *   templateName?:   string   – override the template name (defaults to env PINNACLE_TEMPLATE_NAME)
 *   destinationUrl?: string   – tracking CTA destination (defaults to www.athayogliving.com)
 *   enableTracking?: boolean  – enable Pinnacle click tracking (default: true)
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    buildPinnacleHeaders,
    buildPinnaclePayload,
    parsePinnacleResponse,
} from '@/lib/pinnacle';

// Pinnacle endpoint: https://partnersv1.pinbot.ai/v3/{id}
// {{1}} in the Pinnacle docs is your Pinnacle account/client ID — a URL path segment.
// Set PINNACLE_ID in your environment variables.
const PINNACLE_BASE_URL = 'https://partnersv1.pinbot.ai/v3';

export async function POST(request: NextRequest) {
    // ── 1. Parse & validate request body ────────────────────────────────────────
    let body: {
        phoneNumber?: string;
        name?: string;
        registrationId?: string;
        pdfUrl?: string;
        templateName?: string;
        destinationUrl?: string;
        enableTracking?: boolean;
    };

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const { phoneNumber, name, registrationId, pdfUrl, templateName, destinationUrl, enableTracking } = body;

    if (!phoneNumber || !name || !registrationId || !pdfUrl) {
        return NextResponse.json(
            {
                error: 'Missing required fields: phoneNumber, name, registrationId, pdfUrl.',
            },
            { status: 400 }
        );
    }

    // ── 2. Resolve template name ─────────────────────────────────────────────────
    const resolvedTemplateName = templateName || process.env.PINNACLE_TEMPLATE_NAME;
    if (!resolvedTemplateName) {
        return NextResponse.json(
            {
                error:
                    'No template name provided. Pass `templateName` in the request body or set PINNACLE_TEMPLATE_NAME in environment variables.',
            },
            { status: 400 }
        );
    }

    // ── 3. Build endpoint URL with Pinnacle account ID ─────────────────────────
    // The API endpoint is: https://partnersv1.pinbot.ai/v3/{PINNACLE_ID}
    // PINNACLE_ID is your Pinnacle account/client ID (the {{1}} in their docs).
    const pinnacleId = process.env.PINNACLE_ID;
    if (!pinnacleId) {
        return NextResponse.json(
            { error: 'PINNACLE_ID is not configured in environment variables.' },
            { status: 500 }
        );
    }
    const trackingEndpoint = `${PINNACLE_BASE_URL}/${pinnacleId}`;

    // ── 4. Build payload ─────────────────────────────────────────────────────────
    const payload = buildPinnaclePayload({
        mobileNumber: phoneNumber,
        templateName: resolvedTemplateName,
        pdfUrl,
        name,
        registrationId,
        enableTracking: enableTracking ?? true,
        destinationUrl: destinationUrl || 'www.athayogliving.com',
    });

    // ── 5. Build headers ─────────────────────────────────────────────────────────
    let headers: HeadersInit;
    try {
        headers = buildPinnacleHeaders();
    } catch (err: any) {
        console.error('[Pinnacle] Configuration error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

    // ── 6. Call Pinnacle API ─────────────────────────────────────────────────────
    let pinnacleRes: Response;
    try {
        pinnacleRes = await fetch(trackingEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });
    } catch (err: any) {
        console.error('[Pinnacle] Network error:', err.message);
        return NextResponse.json(
            { error: 'Failed to reach Pinnacle API. Network error.' },
            { status: 502 }
        );
    }

    // ── 7. Parse & return response ────────────────────────────────────────────────
    const result = await parsePinnacleResponse(pinnacleRes);

    if (result.success) {
        return NextResponse.json(
            { success: true, message: result.message, data: result.data },
            { status: result.status }
        );
    }

    // Pass back the correct HTTP status from Pinnacle so callers can handle it appropriately
    return NextResponse.json(
        { success: false, error: result.message, data: result.data },
        { status: result.status }
    );
}

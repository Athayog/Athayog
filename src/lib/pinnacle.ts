/**
 * Pinnacle WhatsApp Business API Integration
 * Base URL: https://partnersv1.pinbot.ai/v3/
 *
 * Utility functions for:
 * - Building authenticated request headers
 * - Constructing the message payload
 * - Formatting destination URLs for the Tracking Campaign
 * - Parsing standard API responses
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface PinnacleSendPayload {
    /** Recipient's WhatsApp number (with country code, e.g. "+919876543210") */
    mobileNumber: string;
    /** Approved utility template name configured in Pinnacle */
    template_name: string;
    /** Publicly accessible URL to the user's unique PDF ticket */
    header: string;
    /** Template variable bindings:  {{1}} = Name, {{2}} = Registration ID */
    body_variables: [string, string];
    /** When true the API records click data (Mobile, Browser, OS, Timestamp) */
    enable_tracking?: boolean;
    /** Destination URL for the "Visit" CTA button (formatted via formatTrackingUrl) */
    tracking_url?: string;
}

export interface PinnacleResponse {
    success: boolean;
    status: number;
    message: string;
    data?: unknown;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Build request headers for all Pinnacle API calls.
 * The API key is read from the server-side env variable PINNACLE_API_KEY.
 */
export function buildPinnacleHeaders(): HeadersInit {
    const apiKey = process.env.PINNACLE_API_KEY;
    if (!apiKey) {
        throw new Error('PINNACLE_API_KEY is not configured in environment variables.');
    }
    return {
        'Content-Type': 'application/json',
        apikey: apiKey,
    };
}

/**
 * Format a destination URL for the Pinnacle Tracking Campaign.
 *
 * Rule: strip "http://" or "https://" prefix, then ensure a trailing slash.
 *
 * @example
 *   formatTrackingUrl('https://www.athayogliving.com') // → 'www.athayogliving.com/'
 *   formatTrackingUrl('http://www.athayogliving.com/') // → 'www.athayogliving.com/'
 *   formatTrackingUrl('www.athayogliving.com')         // → 'www.athayogliving.com/'
 */
export function formatTrackingUrl(url: string): string {
    // Strip http:// or https://
    const stripped = url.replace(/^https?:\/\//i, '');
    // Ensure trailing slash
    return stripped.endsWith('/') ? stripped : `${stripped}/`;
}

/**
 * Build a Pinnacle-compatible JSON payload for the registration ticket template.
 *
 * @param options.mobileNumber   Recipient phone (with country code)
 * @param options.templateName   Approved Pinnacle template name
 * @param options.pdfUrl         Public URL to the user's PDF ticket
 * @param options.name           Registrant's name (maps to template {{1}})
 * @param options.registrationId Ticket / Registration ID (maps to template {{2}})
 * @param options.enableTracking Whether to record click data in Campaign Tracking Report
 * @param options.destinationUrl Raw destination URL to format for tracking CTA button
 */
export function buildPinnaclePayload(options: {
    mobileNumber: string;
    templateName: string;
    pdfUrl: string;
    name: string;
    registrationId: string;
    enableTracking?: boolean;
    destinationUrl?: string;
}): PinnacleSendPayload {
    const {
        mobileNumber,
        templateName,
        pdfUrl,
        name,
        registrationId,
        enableTracking = true,
        destinationUrl = 'www.athayogliving.com',
    } = options;

    const payload: PinnacleSendPayload = {
        mobileNumber,
        template_name: templateName,
        header: pdfUrl,
        body_variables: [name, registrationId],
        enable_tracking: enableTracking,
        tracking_url: formatTrackingUrl(destinationUrl),
    };

    return payload;
}

/**
 * Parse a Pinnacle API HTTP response into a normalized PinnacleResponse object.
 * Handles 200/201 (success), 400 (bad request), 401/403 (auth), and 500+ (server).
 */
export async function parsePinnacleResponse(res: Response): Promise<PinnacleResponse> {
    let data: unknown;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (res.ok) {
        // 200 or 201
        console.log(`[Pinnacle] ✅ Message sent successfully (${res.status}):`, data);
        return { success: true, status: res.status, message: 'Message sent successfully.', data };
    }

    if (res.status === 400) {
        console.warn('[Pinnacle] ⚠️ Bad request — missing or invalid parameters:', data);
        return {
            success: false,
            status: 400,
            message: 'Bad request: missing or invalid parameters.',
            data,
        };
    }

    if (res.status === 401 || res.status === 403) {
        console.error(`[Pinnacle] 🔐 Authentication/authorization failure (${res.status}):`, data);
        return {
            success: false,
            status: res.status,
            message: 'Authentication or authorization failure. Check your PINNACLE_API_KEY.',
            data,
        };
    }

    // Catch-all for 5xx and anything else
    console.error(`[Pinnacle] ❌ Unexpected API error (${res.status}):`, data);
    return {
        success: false,
        status: res.status,
        message: `Unexpected API error (${res.status}).`,
        data,
    };
}

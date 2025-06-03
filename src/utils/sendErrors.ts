// utils/sendError.ts
export async function sendErrorLog(payload: {
    message: string;
    formData?: any;
    errorDetails?: any;
}) {
    try {
        const res = await fetch('/api/send-errors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.error('Failed to send error log:', await res.text());
        }
    } catch (err) {
        console.error('Error sending error log:', err);
    }
}

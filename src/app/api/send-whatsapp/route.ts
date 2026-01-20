// app/api/send-message/route.js (or .ts if using TypeScript)

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { name, ticketId, media_url, phoneNumber } = await request.json()

    if (!name || !ticketId || !media_url || !phoneNumber) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const userid = process.env.NEXT_PUBLIC_GUPSHUP_USER_ID
    const password = process.env.NEXT_PUBLIC_GUPSHUP_PASSOWRD

    const encodedMediaUrl = encodeURIComponent(media_url)
    const encodedFileName = encodeURIComponent(ticketId + '_Ticket')

    const updatedURL = `https://media.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${password}&send_to=${phoneNumber}&v=1.1&format=json&msg_type=DOCUMENT&method=SENDMEDIAMESSAGE&caption=ATHAYOG+%7C+YOGA+ARAMBHA+2025+CONFIRMATION%0A%0ANamaste+${name}+%F0%9F%99%8F%2C%0A%0AThank+you+for+registering+for+the+Yoga+Arambha+2025+with+Athayog%2C%0Ain+association+with+Shri+Tejasvi+Surya%2C+Member+of+Parliament+%E2%80%93+Bengaluru+South.%0A%0A%F0%9F%93%85+Date%3A+June+21%2C+2025++%0A%F0%9F%93%8D+Venue%3A+Kittur+Rani+Chennamma+stadium%2C+Jayanagar%0A%F0%9F%95%92+Timing%3A+6%3A00+am+onwards++%0A%F0%9F%A7%BE+Registration+ID%3A+${encodeURIComponent(ticketId)}%0A%0AYour+unique+entry+QR+code+and+event+pass+are+ready+%E2%9C%85%0A%0APlease+Note++%0A%E2%9C%85+Bring+your+yoga+mat+%26+water+bottle++%0A%E2%9C%85+Wear+comfortable+yoga+attire++%0A%E2%9C%85+Arrive+at+least+15+minutes+early++%0A%E2%9C%85+Show+the+QR+code+at+the+entry+gate%0A%0ALet%E2%80%99s+come+together+to+celebrate+yoga%2C+health+%26+harmony+%F0%9F%8C%BF%0A%0ASee+you+on+the+mat%21++%0ATeam+Athayog&media_url=${encodedMediaUrl}&filename=${encodedFileName}`

    try {
        const response = await fetch(updatedURL, {
            method: 'GET',
            redirect: 'follow',
        })

        const text = await response.text()

        return NextResponse.json({ result: text })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch message API' }, { status: 500 })
    }
}

// lib/facebookPixel.ts
export const FB_PIXEL_ID = '1011750923226651' // Replace with actual ID

export const pageview = () => {
    (window as any).fbq('track', 'PageView')
}

export const event = (name: string, options = {}) => {
    (window as any).fbq('track', name, options)
}

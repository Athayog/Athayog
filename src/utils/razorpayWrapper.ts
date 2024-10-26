interface PaymentResponse {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
}

interface PaymentOptions {
    amount: number
    onSuccess: () => void
    onFailure: () => void
    onDismiss?: () => void
    notes?: any
}

export const initiateRazorpayPayment = async ({ amount, onSuccess, onFailure, onDismiss, notes }: PaymentOptions) => {
    try {
        const orderRes = await fetch('/api/create-order', {
            method: 'POST',
            body: JSON.stringify({ amount: amount * 100 }),
            headers: { 'Content-Type': 'application/json' },
        })
        const orderData = await orderRes.json()

        const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: orderData.id,
            handler: async (response: PaymentResponse) => {
                const verifyRes = await fetch('/api/verify-order', {
                    method: 'POST',
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                        notes,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                const verifyData = await verifyRes.json()

                if (verifyData.isOk) {
                    onSuccess()
                } else {
                    onFailure()
                }
            },
            modal: {
                ondismiss: () => {
                    console.log('Razorpay modal dismissed')
                    if (onDismiss) onDismiss()
                },
            },
        }

        const payment = new (window as any).Razorpay(paymentData)
        payment.open()
    } catch (error) {
        console.error('Payment initiation failed:', error)
        onFailure()
    }
}

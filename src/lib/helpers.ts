export const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
})

export const formatToCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })

    // Add space after the currency symbol
    return formatter.format(amount).replace(/[^\d\s,.]+/, (match) => `${match} `)
}

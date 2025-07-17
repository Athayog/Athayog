'use client'
import Script from 'next/script'
import { useState } from 'react'
import { Content } from '@prismicio/client'
import { NumberField } from '@prismicio/client'
import { KeyTextField } from '@prismicio/client'
import { Box, Typography, Grid, CircularProgress } from '@mui/material'
import Button from '@/components/elements/button/Index'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { initiateRazorpayPayment } from '@/utils/razorpayWrapper'
import useAuthStore from '@/store/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import { useSnackbar } from '@/components/SnackbarProvider'
import usePurchaseStore from '@/store/usePurchases'
import { formatToCurrency } from '@/lib/helpers'

export type GroupClassPricingProps = SliceComponentProps<Content.GroupClassPricingSlice>

const PackagesBox = ({
    name,
    type,
    days,
    price,
    createOrder,
    process,
    gst,
    oldPrice,
}: {
    name: string | KeyTextField
    type: string | KeyTextField
    days: number | NumberField
    price: NumberField
    gst: NumberField
    createOrder: (price: number, courseDetails: any) => void
    process: boolean
    oldPrice?: NumberField
}) => {
    const totalPrice = (price ?? 0) + (gst ?? 0)
    const courseDetails = { name, type, days, price: totalPrice }
    return (
        <Box
            sx={{
                background: '#f5ffef',
                padding: { xs: '20px 25px', md: '30px 40px' },
                borderRadius: '12px',
                border: '1.838px solid #549610',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
            }}
        >
            <Typography sx={{ fontSize: { xs: '25px', md: '38px' }, color: '#303030', fontWeight: '600', textAlign: 'center' }}>{name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: { xs: '11px', md: '20px' }, width: '100%', color: '#606060' }}>
                <Typography sx={{ fontSize: { xs: '21px', md: '32px' }, fontWeight: '400', textAlign: 'center' }}>{type}</Typography>
                <Typography sx={{ fontSize: { xs: '21px', md: '32px' }, fontWeight: '400', textAlign: 'center' }}>{days} Days</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: '10px' }}>
                <Typography sx={{ fontSize: { xs: '30px', md: '45px' }, color: '#303030', fontWeight: '600', textAlign: 'center', marginTop: { xs: '10px', md: '15px' } }}>
                    {price && formatToCurrency(price)}
                </Typography>
                {oldPrice && (
                    <Typography sx={{ fontSize: { xs: '18px', md: '24px' }, fontWeight: '400', color: '#606060', textDecoration: 'line-through', marginTop: { xs: '10px', md: '15px' } }}>
                        {formatToCurrency(oldPrice)}
                    </Typography>
                )}
            </Box>
            {price && (
                <Button
                    disabled={process}
                    onClick={() => createOrder(totalPrice, courseDetails)}
                    sx={{ background: ' linear-gradient(92deg, #42740E 24.16%, #65B710 166.68%)', color: '#fff', alignSelf: 'flex-end' }}
                >
                    {process ? <CircularProgress /> : 'Register'}
                </Button>
            )}
        </Box>
    )
}

interface Purchase {
    courseDetails: any
    amount: number
}
const GroupClassPricing = ({ slice }: GroupClassPricingProps): JSX.Element => {
    const [process, setInProcess] = useState<boolean>(false)
    const { addPurchase, loading, error, resetError, purchases } = usePurchaseStore()
    const [currentPurchse, setCurrentPurchase] = useState<Purchase | null>(null)
    const { showSnackbar } = useSnackbar()
    const { user, setRedirectPath } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    const handlePaymentSuccess = async () => {
        setInProcess(false)
        const purchaseId = await addPurchase(currentPurchse?.courseDetails, currentPurchse?.amount ?? 0)
        router.push(`/payment-success?id=${purchaseId}`)
    }

    const handlePaymentFailure = () => {
        setInProcess(false)
    }

    const handleModalDismiss = () => {
        setInProcess(false)
    }

    const createOrder = (amount: number, courseDetails: any) => {
        if (user) {
            setCurrentPurchase({ courseDetails, amount })
            setInProcess(true)
            initiateRazorpayPayment({ amount, onSuccess: handlePaymentSuccess, onFailure: handlePaymentFailure, onDismiss: handleModalDismiss, notes: { userId: user.uid, ...courseDetails } })
        } else {
            setRedirectPath(pathname)
            showSnackbar('Please login or register to continue', 'warning')
            router.push('/login')
        }
    }

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
            <>
                <Box sx={{ background: 'linear-gradient(to bottom, #cdf7c9, #EAFEDF)', height: '100%', margin: 0, padding: { xs: '30px 10px', md: '60px 50px' } }}>
                    <Box sx={{ maxWidth: { xs: '100%', md: '1200px' }, margin: '0 auto' }}>
                        <Box sx={{ fontSize: { xs: '24px', md: '48px' }, fontWeight: '700', textAlign: 'center', color: '#2A5200', '&& p': { margin: 0 } }}>{slice.primary.title}</Box>

                        <Box>
                            <Typography sx={{ fontSize: { xs: '18px', md: '48px' }, fontWeight: '400', textAlign: 'center', color: '#284E01' }}>Subscription for Indiranagar</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: { xs: '0px', md: '20px' }, flexDirection: 'column' }}>
                                {' '}
                                <Grid container xs={12} lg={12} spacing={4} sx={{ marginTop: { xs: '0px', md: '20px' } }}>
                                    {slice.primary.subscriptionforindiranagar.map((item, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <PackagesBox
                                                createOrder={createOrder}
                                                name={item.course_name}
                                                type="Indiranagar"
                                                days={item.days}
                                                price={item.price}
                                                process={process}
                                                gst={item.gst}
                                                oldPrice={item.old_price}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '32px', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: { xs: '32px', md: '48px' }, fontWeight: '400', textAlign: 'center', color: '#284E01' }}>Other Categories</Typography>
                            <Grid container xs={12} lg={12} spacing={4} sx={{ marginTop: { xs: '0px', md: '20px' } }}>
                                {slice.primary.other_courses.map((item, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <PackagesBox
                                            createOrder={createOrder}
                                            name={item.course_name}
                                            type={item.detail}
                                            days={item.days}
                                            price={item.price}
                                            process={process}
                                            gst={item.gst}
                                            oldPrice={item.old_price}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box sx={{ marginTop: '60px', fontSize: { xs: '16px', md: '32px' }, '&&& p': { margin: 0 } }}>
                            <PrismicRichText field={slice.primary.terms_and_conditions} />
                        </Box>
                    </Box>
                </Box>
            </>
        </section>
    )
}

export default GroupClassPricing

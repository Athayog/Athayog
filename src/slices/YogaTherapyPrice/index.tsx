'use client'
import Script from 'next/script'
import { useState } from 'react'
import theme from '@/styles/theme'
import { formatToCurrency } from '@/lib/helpers'
import { Content } from '@prismicio/client'
import useAuthStore from '@/store/useAuthStore'
import { KeyTextField } from '@prismicio/client'
import usePurchaseStore from '@/store/usePurchases'
import Button from '@/components/elements/button/Index'
import { usePathname, useRouter } from 'next/navigation'
import { useSnackbar } from '@/components/SnackbarProvider'
import { initiateRazorpayPayment } from '@/utils/razorpayWrapper'
import { Box, CircularProgress, Typography } from '@mui/material'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

interface HighlightedTextProps {
    subtitle: KeyTextField | string
    highlight: KeyTextField | string
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ subtitle, highlight }) => {
    // Split the subtitle by the highlighted part and wrap it with a span
    const parts = subtitle?.split(new RegExp(`(${highlight})`, 'gi'))

    return (
        <Typography sx={{ color: '#000', fontSize: { xs: '18px', md: '30px' }, fontWeight: '400' }}>
            {parts?.map((part, index) =>
                part.toLowerCase() === highlight?.toLowerCase() ? (
                    <Box component="span" key={index} sx={{ color: '#3E7A00', fontWeight: 'bold' }}>
                        {part}
                    </Box>
                ) : (
                    part
                )
            )}
        </Typography>
    )
}

export type YogaTherapyPriceProps = SliceComponentProps<Content.YogaTherapyPriceSlice>

interface Purchase {
    courseDetails: any
    amount: number
}

const YogaTherapyPrice = ({ slice }: YogaTherapyPriceProps): JSX.Element => {
    const [process, setInProcess] = useState<boolean>(false)
    const { addPurchase, loading, error, resetError } = usePurchaseStore()
    const [currentPurchse, setCurrentPurchase] = useState<Purchase | null>(null)
    const { showSnackbar } = useSnackbar()
    const { user, setRedirectPath } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    const handlePaymentSuccess = async () => {
        setInProcess(false)
        await addPurchase(currentPurchse?.courseDetails, currentPurchse?.amount ?? 0)
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
            <Box sx={{ background: 'linear-gradient(to bottom, #e5fbd3, #EAFEDF)', height: '100%', margin: 0, padding: { xs: '30px 10px', md: '60px 50px' } }}>
                <Box sx={{ margin: '0 auto', maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '48px', color: '#284E01', fontWeight: '700', [theme.breakpoints.down('md')]: { fontSize: '28px' } }}>{slice.primary.title}</Typography>
                    <Box sx={{ color: '#000', fontSize: { xs: '18px', md: '30px' }, fontWeight: '400', marginTop: { xs: '14px', md: '26px' }, textAlign: 'center' }}>
                        {' '}
                        <HighlightedText subtitle={slice.primary.subtitle} highlight={slice.primary.subtitle_highlighted_part} />
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start', width: '100%', marginTop: '0px' }}>
                        <Box>
                            {slice.primary.courses.map((item) => {
                                const courseDetails = { name: item.name, days: item.days, type: item.information, price: item.price }
                                return (
                                    <Box key={item.name} sx={{ marginTop: '40px', padding: { xs: '20px 25px', md: '30px 40px', borderRadius: '12px', border: '1.838px solid #549610' } }}>
                                        <Typography sx={{ fontSize: { xs: '25px', md: '38px' }, color: '#303030', display: { xs: 'block', md: 'none' }, fontWeight: '600' }}>{item.name}</Typography>
                                        <Box
                                            sx={{
                                                background: '#E7FFCEB2',
                                                flexWrap: 'wrap',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: { xs: 'end', md: 'baseline' },
                                                width: '100%',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', md: '20px' } }}>
                                                <Typography sx={{ fontSize: { xs: '25px', md: '38px' }, color: '#303030', display: { xs: 'none', md: 'block' }, fontWeight: '600' }}>
                                                    {item.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: { xs: '50px', md: '100px' } }}>
                                                    <Typography sx={{ fontSize: { xs: '21px', md: '32px' }, fontWeight: '400' }}>
                                                        {item.days === 1 ? `${item.days} Day` : `${item.days} Days`}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: { xs: '21px', md: '32px' }, fontWeight: '400' }}>{item.information}</Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: '30px', md: '45px' },
                                                        display: { xs: 'block', md: 'none' },
                                                        color: '#303030',
                                                        fontWeight: '600',

                                                        marginTop: { xs: '10px', md: '15px' },
                                                    }}
                                                >
                                                    ₹ {item.price}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: '30px', md: '45px' },
                                                        color: '#303030',
                                                        fontWeight: '600',
                                                        display: { xs: 'none', md: 'block' },
                                                        marginTop: { xs: '10px', md: '15px' },
                                                    }}
                                                >
                                                    {item.price && formatToCurrency(item.price)}
                                                </Typography>

                                                {item.price !== null && item.price !== 0 && (
                                                    <Button
                                                        disabled={process}
                                                        onClick={() => createOrder((item.price ?? 0) + (item.gst ?? 0), courseDetails)}
                                                        sx={{
                                                            width: 'max-content',
                                                            marginTop: '30px',
                                                            background: ' linear-gradient(92deg, #42740E 24.16%, #65B710 166.68%)',
                                                            color: '#fff',
                                                            alignSelf: 'flex-end',
                                                        }}
                                                    >
                                                        {process ? <CircularProgress /> : '    Register Now'}
                                                    </Button>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                        <Box sx={{ marginTop: '60px', width: '100%', fontSize: { xs: '16px', md: '32px' } }}>
                            <PrismicRichText field={slice.primary.terms_and_conditions} />
                        </Box>
                    </Box>
                </Box>{' '}
            </Box>
        </section>
    )
}

export default YogaTherapyPrice

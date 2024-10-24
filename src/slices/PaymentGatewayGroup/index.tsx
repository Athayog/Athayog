import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `PaymentGatewayGroup`.
 */
export type PaymentGatewayGroupProps = SliceComponentProps<Content.PaymentGatewayGroupSlice>

/**
 * Component for "PaymentGatewayGroup" Slices.
 */
const PaymentGatewayGroup = ({ slice }: PaymentGatewayGroupProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <Typography sx={{ fontSize: { xs: '20px', md: '44px', marginBottom: { xs: '20px', md: '70px' } }, fontWeight: '700', textAlign: 'center' }}>{slice.primary.title}</Typography>
                <PrismicNextImage field={slice.primary.types_image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </BackgroundColorLayout>
        </section>
    )
}

export default PaymentGatewayGroup

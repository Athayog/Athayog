'use client'
import Button from '@/components/elements/button/Index'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { KeyTextField } from '@prismicio/client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

interface HighlightedTextProps {
    subtitle: KeyTextField | string
    highlight: KeyTextField | string
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ subtitle, highlight }) => {
    // Split the subtitle by the highlighted part and wrap it with a span
    const parts = subtitle?.split(new RegExp(`(${highlight})`, 'gi'))

    return (
        <Typography
            sx={{
                color: '#000',
                fontSize: { xs: '18px', md: '30px' },
                fontWeight: '400',
            }}
        >
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
/**
 * Props for `YogaTherapyPrice`.
 */
export type YogaTherapyPriceProps = SliceComponentProps<Content.YogaTherapyPriceSlice>

/**
 * Component for "YogaTherapyPrice" Slices.
 */
const YogaTherapyPrice = ({ slice }: YogaTherapyPriceProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #e5fbd3, #EAFEDF)',
                    height: '100%',
                    margin: 0,
                    padding: { xs: '30px 10px', md: '60px 50px' },
                }}
            >
                <Box sx={{ margin: '0 auto', maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: '48px',
                            color: '#284E01',
                            fontWeight: '700',
                            [theme.breakpoints.down('md')]: {
                                fontSize: '28px',
                            },
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Box
                        sx={{
                            color: '#000',
                            fontSize: { xs: '18px', md: '30px' },
                            fontWeight: '400',
                            marginTop: { xs: '14px', md: '26px' },
                            textAlign: 'center',
                        }}
                    >
                        {' '}
                        <HighlightedText subtitle={slice.primary.subtitle} highlight={slice.primary.subtitle_highlighted_part} />
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start', width: '100%', marginTop: '0px' }}>
                        <Box>
                            {slice.primary.courses.map((item) => (
                                <Box key={item.name} sx={{ marginTop: '40px', padding: { xs: '20px 25px', md: '30px 40px', borderRadius: '12px', border: '1.838px solid #549610' } }}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '25px', md: '38px' },
                                            color: '#303030',
                                            display: { xs: 'block', md: 'none' },
                                            fontWeight: '600',
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            background: '#E7FFCEB2',

                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: { xs: 'end', md: 'baseline' },
                                            width: '100%',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '10px', md: '20px' } }}>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: '25px', md: '38px' },
                                                    color: '#303030',
                                                    display: { xs: 'none', md: 'block' },
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: { xs: '50px', md: '100px' } }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: '21px', md: '32px' },
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {item.days}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: '21px', md: '32px' },
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {item.information}
                                                </Typography>
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
                                                ₹ {item.price}
                                            </Typography>
                                            <Button
                                                sx={{
                                                    width: 'max-content',
                                                    marginTop: '30px',
                                                    background: ' linear-gradient(92deg, #42740E 24.16%, #65B710 166.68%)',
                                                    color: '#fff',
                                                    alignSelf: 'flex-end',
                                                }}
                                            >
                                                Register Now
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                marginTop: '60px',
                                width: '100%',
                                fontSize: { xs: '16px', md: '32px' },
                            }}
                        >
                            <PrismicRichText field={slice.primary.terms_and_conditions} />
                        </Box>
                    </Box>
                </Box>{' '}
            </Box>
        </section>
    )
}

export default YogaTherapyPrice

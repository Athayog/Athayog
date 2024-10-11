import Button from '@/components/elements/button/Index'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `OurTeam`.
 */
export type OurTeamProps = SliceComponentProps<Content.OurTeamSlice>

/**
 * Component for "OurTeam" Slices.
 */
const OurTeam = ({ slice }: OurTeamProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: '#E7FAE3',
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { xs: '24px', md: '52px' },
                                fontWeight: '700',
                                textAlign: 'center',
                                color: '#2A5200',
                            }}
                        >
                            {slice.primary.title}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            maxWidth: '1000px',
                            color: '#00000',
                            fontSize: { xs: '17px', md: '24px' },
                            fontWeight: '400',
                            lineHeight: { xs: '29px', md: '49px' },
                            textAlign: 'center',
                            marginTop: { xs: '14px', md: '26px' },
                        }}
                    >
                        {' '}
                        <PrismicRichText field={slice.primary.description} />
                    </Box>

                    {slice.primary.employee.map((item) => (
                        <Box
                            key={item.employee_name}
                            sx={{
                                marginTop: '40px',
                                padding: { xs: '20px 25px', md: '30px 40px' },
                                borderRadius: '12px',
                                border: '1.838px solid #549610',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: { xs: '20px', md: '30px' },
                                flexDirection: { xs: 'column', md: 'row' },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: '150px', md: '180px' }, // Responsive width for smaller and larger devices
                                    height: { xs: '150px', md: '180px' }, // Same for height to maintain circular shape
                                    overflow: 'hidden',
                                    borderRadius: '50%', // Fully rounded image
                                    position: 'relative',
                                    border: '4px solid transparent', // Transparent border for gradient effect
                                    background: 'linear-gradient(45deg, #F8BCC0, #8CCE5F)', // Gradient for border
                                    backgroundClip: 'border-box',
                                    padding: '0px', // Padding to show the border
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        inset: 0,
                                        zIndex: 1,
                                        background: '#fff', // White background inside the border
                                        borderRadius: '50%',
                                    },
                                }}
                            >
                                <Box sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
                                    <PrismicNextImage
                                        field={item.employee_image}
                                        style={{
                                            objectFit: 'cover', // Ensure image fills the container
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%', // Ensure the image itself is also rounded
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ marginTop: '20px' }}>
                                <Typography sx={{ color: '#284E01', fontSize: { xs: '28px', md: '38px' }, fontWeight: '700' }}>{item.employee_name}</Typography>
                                <Typography sx={{ color: '#284E01', fontSize: { xs: '20px', md: '30px' }, fontWeight: '600' }}>{item.employee_designation}</Typography>
                                <PrismicRichText field={item.employee_details} />
                                <Button sx={{ backgroundColor: '#47820D', color: '#fff' }}>{slice.primary.button_text}</Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    )
}

export default OurTeam

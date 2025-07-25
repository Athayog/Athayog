'use client'
import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box, Typography, Container, Button, Grid } from '@mui/material'
import Image from 'next/image'
import LeftBack from '/public/images/IDY-1.png'
import RightBack from '/public/images/IDY-Right.png'
import Y1 from '/public/images/Y1.png'
import Y2 from '/public/images/Y2.png'
import RegisterButton from '@/components/elements/button/RegisterButton'
/**
 * Props for `ArambhaRegister`.
 */
export type ArambhaRegisterProps = SliceComponentProps<Content.ArambhaRegisterSlice>

/**
 * Component for "ArambhaRegister" Slices.
 */
const ArambhaRegister: FC<ArambhaRegisterProps> = ({ slice }) => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    console.log(slice.primary.dates_mobile)
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ background: backgroundGradient, padding: { xs: '30px 0px', md: '60px 0px' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    {/* Left Image */}

                    <Box position="relative" sx={{ zIndex: 2, width: '100%', height: 600, display: { xs: 'none', md: 'block' } }}>
                        {/* Background Image */}
                        <Box sx={{ position: 'absolute', top: 350, left: 0, width: '100%', height: '200px', zIndex: 1 }}>
                            <Image
                                src={LeftBack}
                                alt="background"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Foreground Image */}
                        <Box sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', top: 100 }}>
                            <Image
                                src={slice.primary.leftimage.url || '/placeholder.png'}
                                alt="Yoga Pose Left"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Box>

                    <Box width="100%" >
                        <Grid spacing={4} alignItems="center" justifyContent="center">

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 3,
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <Box sx={{ width: { xs: '70px', md: '100px' }, position: 'relative' }}>
                                    <Image src={Y2} alt="ss" layout="responsive" />
                                </Box>
                                <Box sx={{ width: { xs: '50px', md: '80px' }, position: 'relative' }}>
                                    <Image src={Y1} alt="ss" layout="responsive" />
                                </Box>
                            </Box>
                            {/* Center Content */}
                            <Grid item xs={6} md={6} sx={{ padding: { xs: 2, md: 6 } }}>

                                <Typography align="center" sx={{ color: '#007B48', fontWeight: 700, fontSize: { xs: '36px', md: '38px' } }}>
                                    {slice.primary.title}
                                </Typography>
                                <Typography align="center" gutterBottom sx={{ color: '#007B48', fontWeight: 700, fontSize: { xs: '20px', md: '30px' } }}>
                                    {slice.primary.subtitle}
                                </Typography>
                                <Box sx={{
                                    mb: '0px', textAlign: 'center', fontSize: { xs: '20px', md: '24px' }, width: { xs: 'auto', md: "max-content" }, fontWeight: 600, '&& p': {
                                        margin: 0,
                                    }, 'p:first-of-type': { marginTop: 0, fontFamily: 'var(--font-montserrat)', marginBottom: '0px' }
                                }}>
                                    <PrismicRichText field={slice.primary.description} />

                                </Box>

                                <Box sx={{
                                    margin: "40px auto", textAlign: 'center', fontSize: { xs: '20px', md: '24px' }, width: { xs: 'auto', md: "max-content" }, fontWeight: 600, '&& p': {
                                        margin: 0,
                                    }, 'p': { marginTop: '20px', marginBottom: '40px', textAlign: 'center' }
                                }}>
                                    <Box sx={{ display: { xs: "none", md: 'block' } }}>
                                        <PrismicRichText field={slice.primary.dates} />
                                    </Box>
                                    <Box sx={{ display: { xs: "block", md: 'none' } }}>
                                        <PrismicRichText field={slice.primary.dates_mobile} />
                                    </Box>

                                </Box>


                                <Box display="flex" justifyContent="center" mb={4} >
                                    <RegisterButton href="#register-form" variant="contained" sx={{ backgroundColor: "#FF5B02", boxShadow: 'none', width: 'max-content', textAlign: 'center', padding: { xs: '30px 40px', md: '50px 80px' } }} >
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: { xs: '19px', md: '32px' } }}>
                                                {slice.primary.registration_button_title}
                                            </Typography>
                                            <Typography sx={{ fontWeight: 600, fontSize: { xs: '19px', md: '28px' } }}>
                                                {slice.primary.registration_button_subtitle}
                                            </Typography>
                                        </Box>
                                    </RegisterButton>
                                </Box>
                            </Grid>



                        </Grid>



                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                gap: 2,
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Left Image */}
                            <Box
                                position="relative"
                                sx={{
                                    flex: '1 1 200px',
                                    aspectRatio: '2/3',
                                    maxWidth: 150,
                                    width: '100%',
                                }}
                            >
                                {/* Background */}
                                <Image
                                    src={LeftBack}
                                    alt="background left"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        zIndex: 1,
                                        opacity: 0.3,
                                    }}
                                />

                                {/* Foreground */}
                                <Image
                                    src={slice.primary.leftimage.url || '/placeholder.png'}
                                    alt="Yoga Pose Left"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        zIndex: 2,
                                    }}
                                />
                            </Box>

                            {/* Right Image */}
                            <Box
                                position="relative"
                                sx={{
                                    flex: '1 1 200px',
                                    aspectRatio: '2/3',
                                    maxWidth: 150,
                                    width: '100%',
                                }}
                            >
                                {/* Background */}
                                <Image
                                    src={RightBack}
                                    alt="background right"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.3,
                                    }}
                                />

                                {/* Foreground */}
                                <Image
                                    src={slice.primary.rightimage.url || '/placeholder.png'}
                                    alt="Yoga Pose Right"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        zIndex: 2,
                                    }}
                                />
                            </Box>
                        </Box>


                        {/* Line Art Image */}
                        <Box my={4} justifyContent="center" sx={{ display: { xs: 'none', md: 'flex' } }}>

                            <Image
                                src={slice.primary.lineart.url || '/placeholder.png'}
                                alt="Yoga Line Art"
                                width={600}
                                height={600}
                                style={{ width: '100%', maxWidth: 600, height: 'auto' }}
                            />
                        </Box>


                    </Box>
                    {/* Right Image */}
                    <Box position="relative" sx={{ zIndex: 2, width: '100%', height: 600, display: { xs: 'none', md: 'block' } }}>
                        {/* Background Image */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 100,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                            }}
                        >
                            <Image
                                src={RightBack}
                                alt="background"
                                fill
                                style={{
                                    objectFit: 'contain',
                                    height: '100%',
                                    width: '100%'
                                }}
                            />
                        </Box>

                        {/* Foreground Image */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                zIndex: 2,
                                top: 100
                            }}
                        >
                            <Image
                                src={slice.primary.rightimage.url || '/placeholder.png'}
                                alt="Yoga Pose Right"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* About the Event */}
                <Box sx={{ padding: { xs: 2, md: 6 } }}>
                    <Typography sx={
                        {
                            fontWeight: 700,
                            fontSize: { xs: '28px', md: '42px' },
                            color: '#007B48',
                        }
                    }
                        align="center" gutterBottom>
                        {slice.primary.abouteventtitle}
                    </Typography>
                    <Box sx={{
                        textAlign: 'center', maxWidth: '1200px', margin: '0 auto', '&& p': {
                            margin: 0,
                            fontSize: { xs: '16px', md: '26px' }
                        }
                    }}>
                        <PrismicRichText field={slice.primary.abouteventdescription} />
                    </Box>
                </Box>
            </Box>
        </section >
    )
}


export default ArambhaRegister

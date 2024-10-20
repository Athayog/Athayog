import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import Banner from '@/components/_shared/Banner'
import Mandela from '/public/images/Mandela.svg'
import Button from '@/components/elements/button/Index'
import flowerMandela from '/public/images/FlowerMandela.png'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
import RichTextComponent from '@/components/RichTextComponent'

/**

/**
 * Props for `CoursesHero`.
 */
export type CoursesHeroProps = SliceComponentProps<Content.CoursesHeroSlice>

/**
 * Component for "CoursesHero" Slices.
 */
const CoursesHero = ({ slice }: CoursesHeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {/* TOODO: CHECK BLUR */}
            <Box
                sx={
                    {
                        // '&&::after': {
                        //     content: '""',
                        //     position: 'absolute',
                        //     top: 0,
                        //     left: 0,
                        //     opacity: '0.4',
                        //     width: '100%',
                        //     height: '100%',
                        //     filter: 'blur(100px)',
                        //     backgroundColor: '#F5F5EA',
                        //     zIndex: 0,
                        // },
                    }
                }
            >
                <Banner
                    imageSrc={{
                        xs: slice.primary.backgroud_image.url,
                        sm: slice.primary.backgroud_image.url,
                        md: slice.primary.backgroud_image.url,
                    }}
                    imageAlt={slice.primary.backgroud_image.alt}
                    height={{ xs: 'max-content', md: '700px', lg: '896px' }}
                    objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                    blurHash={slice.primary.blurhash || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'}
                >
                    <Box
                        sx={{
                            textAlign: 'center',

                            display: 'flex',
                            justifyContent: { xs: 'flex-start', md: 'space-between' },
                            alignItems: 'center',
                            height: '100%',
                            maxWidth: '1400px',
                            flexDirection: { xs: 'column', md: 'row' },
                            margin: { xs: '100px auto 0px auto', lg: '0 auto' },
                            padding: {
                                xs: '10px 20px 10px 20px',
                                md: '0px 50px',
                            },
                            '&& p': {
                                margin: 0,
                            },
                        }}
                    >
                        <Box sx={{ width: { xs: '100%', lg: '60%' }, zIndex: '2', position: 'relative' }}>
                            <Typography
                                sx={{
                                    color: '#478605',
                                    fontSize: { xs: '18px', lg: '32px' },
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    lineHeight: { xs: '56px', lg: '86px' },
                                }}
                            >
                                {slice.primary.banner_title}
                            </Typography>
                            <Box
                                sx={{
                                    color: '#202020',
                                    fontSize: { xs: '36px', lg: '56px' },
                                    textAlign: 'left',
                                    fontWeight: '700',
                                    lineHeight: { xs: '44px', lg: '86px' },
                                    '&& p': {
                                        margin: 0,
                                        display: 'inline',
                                        lineHeight: { xs: '44px', lg: '86px' },
                                    },
                                    'h1, h2, h3, h4, h5, h6': {
                                        fontSize: { xs: '36px', lg: '56px' },
                                        display: 'inline',
                                        lineHeight: { xs: '44px', lg: '86px' },
                                    },
                                }}
                            >
                                <PrismicRichText field={slice.primary.title} />
                                <span style={{ color: '#528B16', marginLeft: '12px' }}>{slice.primary.highlighted_text}</span>
                            </Box>
                            <Box
                                sx={{
                                    fontSize: { xs: '20px', lg: '27px' },
                                    lineHeight: { xs: '30px', lg: '36px' },
                                    marginTop: '24px',
                                    width: 'max-content',
                                    textAlign: { xs: 'center', md: 'left' },
                                    background: '#FFF',
                                    borderRadius: '90px',
                                    padding: { xs: '8px 16px', lg: ' 21px 30px' },
                                    fontWeight: '600',
                                    color: '#000',
                                    '&& p': {
                                        display: { xs: 'inline', lg: 'block' },
                                        wordWrap: 'break-word',
                                        whiteSpace: 'initial',
                                        margin: 0,
                                    },
                                }}
                            >
                                <PrismicRichText field={slice.primary.subtitle} />
                            </Box>

                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none', marginTop: '20px' },

                                    position: 'relative',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: { xs: 'baseline', md: 'center' },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%', // Maintain aspect ratio
                                        position: 'absolute',
                                        zIndex: 0,
                                        margin: '0 auto',
                                        opacity: 0.4,
                                    }}
                                >
                                    <Image src={flowerMandela} alt="Flower Mandela" style={{ width: '100%', height: '100%' }} />
                                </Box>
                                <Box sx={{ display: { xs: 'block', lg: 'none' }, alignSelf: 'flex-start' }}>
                                    {' '}
                                    <PrismicNextLink field={slice.primary.register_button}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignSelf: 'flex-start',
                                                alignItems: 'center',
                                                marginTop: { xs: '0px', lg: '30px' },
                                                justifyContent: { xs: 'center', md: 'flex-start' },
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    fontSize: { xs: '22px', lg: '26px' },
                                                    alignSelf: 'flex-start',
                                                    padding: '17.467px 23.289px',
                                                    width: { xs: '169px', lg: '257px' },
                                                    height: '60px',
                                                    backgroundColor: '#47820D',
                                                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                                    color: '#fff',
                                                }}
                                            >
                                                {slice.primary.register_button.text}
                                            </Button>
                                        </Box>
                                    </PrismicNextLink>
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: '300px', md: '500px', lg: '500px' }, // Responsive width
                                        height: 'auto', // Maintain aspect ratio
                                        zIndex: 2,
                                        position: 'relative',
                                        maxWidth: 'max-content',
                                        margin: '0 auto',
                                    }}
                                >
                                    <PrismicNextImage field={slice.primary.person_image} style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                                {' '}
                                <PrismicNextLink field={slice.primary.register_button}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: { xs: '0px', lg: '30px' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                        <Button
                                            sx={{
                                                fontSize: { xs: '22px', lg: '26px' },
                                                padding: '17.467px 23.289px',
                                                width: '257px',
                                                height: '60px',
                                                backgroundColor: '#47820D',
                                                boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.44)',
                                                color: '#fff',
                                            }}
                                        >
                                            {slice.primary.register_button.text}
                                        </Button>
                                    </Box>
                                </PrismicNextLink>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', width: { xs: 'max-content', md: '100%', lg: '40%' }, height: '600px', zIndex: '2' }}>
                            <Box
                                sx={{
                                    width: { xs: '400px', md: '100%' }, // Responsive width
                                    height: 'auto', // Maintain aspect ratio
                                    position: 'absolute',
                                    right: '0',
                                    zIndex: 0,
                                    bottom: 0,
                                    opacity: 0.4,
                                }}
                            >
                                <Image src={flowerMandela} alt="Flower Mandela" style={{ width: '100%', height: '100%' }} />
                            </Box>

                            {/* Responsive wrapper for Person image */}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 'auto', // Maintain aspect ratio
                                    zIndex: 2,
                                    position: 'absolute',

                                    bottom: 0,
                                    right: '10%',
                                }}
                            >
                                <PrismicNextImage field={slice.primary.person_image} style={{ width: '100%', height: 'auto' }} />
                            </Box>
                        </Box>
                    </Box>
                </Banner>
            </Box>
        </section>
    )
}

export default CoursesHero

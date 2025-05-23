import Banner from '@/components/_shared/Banner'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `YogaTherapyHero`.
 */
export type YogaTherapyHeroProps = SliceComponentProps<Content.YogaTherapyHeroSlice>

/**
 * Component for "YogaTherapyHero" Slices.
 */
const YogaTherapyHero = ({ slice }: YogaTherapyHeroProps): JSX.Element => {
    const mobileUrl = slice.primary.backgroud_image_mobile ? slice.primary.backgroud_image_mobile.url : slice.primary.backgroud_image.url
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Banner
                imageSrc={{
                    xs: mobileUrl,
                    sm: mobileUrl,
                    md: slice.primary.backgroud_image.url,
                }}
                imageAlt="Personal Session"
                height={{ xs: '700px', sm: '700px', md: '900px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAfAFADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAgMEBQEA/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAECAxES/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECBP/EABgRAQEBAQEAAAAAAAAAAAAAAAARAQIS/9oADAMBAAIRAxEAPwDU9HUyVahzoZ411SmGhE0NlhE01Bpi0wujhUfTjYDoF2KHRujnoS9AHoEFZC2GxqZs2yjK2TndPcaedlEUQZUV5sqoVSw+ioGIKHmxNsbQnQn0qE3Yp6HtGTXQt7h5y//Z"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        height: '100%',
                        color: '#3C1C18',
                        padding: {
                            xs: '150px 2px',
                            sm: '200px 10px',
                            md: '0px 140px',
                        },
                    }}
                >
                    <Box
                        sx={{
                            fontSize: { xs: '40px', sm: '40px', md: '66px' },
                            textAlign: { xs: 'right', sm: 'right', md: 'right' },
                            lineHeight: { xs: '64px', md: '66px' },
                            fontWeight: '700',
                            padding: '20px',
                            maxWidth: '800px',
                        }}
                    >
                        <Box
                            sx={{
                                lineHeight: { xs: '47px', md: '70px' },
                                fontSize: { xs: '24px', md: '44px' },
                                fontWeight: '700',
                                textAlign: 'right',
                                color: '#3C1C18',
                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <Typography sx={{ fontSize: '22px', fontWeight: '500' }}>{slice.primary.subtitle}</Typography>
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default YogaTherapyHero

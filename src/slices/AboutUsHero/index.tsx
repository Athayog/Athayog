import Banner from '@/components/_shared/Banner'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `AboutUsHero`.
 */
export type AboutUsHeroProps = SliceComponentProps<Content.AboutUsHeroSlice>

/**
 * Component for "AboutUsHero" Slices.
 */
const AboutUsHero = ({ slice }: AboutUsHeroProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Banner
                imageSrc={{
                    xs: slice.primary.backgroud_image.url,
                    sm: slice.primary.backgroud_image.url,
                    md: slice.primary.backgroud_image.url,
                }}
                imageAlt={slice.primary.backgroud_image.alt}
                height={{ xs: '700px', sm: '700px', md: '900px' }}
                objectPosition={{ xs: 'bottom', sm: 'bottom', md: 'bottom' }}
                blurHash="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAfAFADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAgMEBQEA/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAECAxES/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECBP/EABgRAQEBAQEAAAAAAAAAAAAAAAARAQIS/9oADAMBAAIRAxEAPwDU9HUyVahzoZ411SmGhE0NlhE01Bpi0wujhUfTjYDoF2KHRujnoS9AHoEFZC2GxqZs2yjK2TndPcaedlEUQZUV5sqoVSw+ioGIKHmxNsbQnQn0qE3Yp6HtGTXQt7h5y//Z"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        height: '100%',
                        color: '#2A5200',
                        padding: {
                            xs: '150px 2px',
                            sm: '200px 10px',
                            md: '0px 140px',
                        },
                    }}
                >
                    <Box
                        sx={{
                            fontSize: { xs: '30px', sm: '40px', md: '54px' },
                            textAlign: { xs: 'center', sm: 'left', md: 'left' },
                            fontWeight: '700',
                            maxWidth: '800px',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: { xs: '24px', md: '66px' },
                                fontWeight: '700',
                                textAlign: 'left',
                                color: '#2A5200',
                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.title} />
                        </Box>
                        <Box sx={{ fontSize: '22px', fontWeight: '500' }}>
                            <PrismicRichText field={slice.primary.subtitle} />
                        </Box>
                    </Box>
                </Box>
            </Banner>
        </section>
    )
}

export default AboutUsHero

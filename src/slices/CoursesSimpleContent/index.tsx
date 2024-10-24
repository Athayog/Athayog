import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { Box } from '@mui/material'
import { nanoid } from 'nanoid'

export type CoursesSimpleContentProps = SliceComponentProps<Content.CoursesSimpleContentSlice>

const CoursesSimpleContent = ({ slice }: CoursesSimpleContentProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                {slice.primary.content.map((item) => (
                    <Box key={nanoid()}>
                        <Box
                            sx={{
                                color: '#202020',
                                fontSize: { xs: '28px', lg: '36px' },
                                textAlign: 'left',
                                fontWeight: '700',
                                maxWidth: '1200px',
                                lineHeight: { xs: '44px', lg: '64px' },
                                marginBottom: { xs: '30px', md: '40px' },
                                '&& p, h1,h2,h3,h4,h5,h6': {
                                    margin: 0,
                                    display: 'inline',
                                    lineHeight: { xs: '44px', lg: '64px' },
                                },
                            }}
                        >
                            <PrismicRichText field={item.title} />
                        </Box>
                        <Box
                            sx={{
                                color: '#202020',
                                fontSize: { xs: '18px', lg: '32px' },
                                textAlign: 'left',
                                fontWeight: '400',
                                maxWidth: '1200px',
                                lineHeight: { xs: '40px', lg: '53px' },
                                '&& p': {
                                    lineHeight: { xs: '44px', lg: '53px' },
                                },
                            }}
                        >
                            <PrismicRichText field={item.description} />
                        </Box>
                    </Box>
                ))}
            </BackgroundColorLayout>
        </section>
    )
}

export default CoursesSimpleContent

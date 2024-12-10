import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `BlogsTitle`.
 */
export type BlogsTitleProps = SliceComponentProps<Content.BlogsTitleSlice>

/**
 * Component for "BlogsTitle" Slices.
 */
const BlogsTitle = ({ slice }: BlogsTitleProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} style={{ backgroundColor: '#e9fdde' }}>
            <section>
                <Box
                    sx={{
                        color: '#202020',
                        textAlign: 'center',
                        fontSize: { xs: '26px', md: '62px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: { xs: '22px', md: '90px' },
                        marginBottom: '10px',
                        h1: {
                            color: '#202020',
                            margin: '0',
                            textAlign: 'center',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        h2: {
                            color: '#202020',
                            margin: '0',
                            textAlign: 'center',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        h3: {
                            color: '#202020',
                            textAlign: 'center',
                            margin: '0',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        h4: {
                            color: '#202020',
                            textAlign: 'center',
                            margin: '0',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        h5: {
                            color: '#202020',
                            textAlign: 'center',
                            margin: '0',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        h6: {
                            color: '#202020',
                            textAlign: 'center',
                            margin: '0',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                        p: {
                            color: '#202020',
                            margin: '0',
                            textAlign: 'center',
                            fontSize: { xs: '26px', md: '62px' },
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: { xs: '22px', md: '90px' },
                        },
                    }}
                >
                    <PrismicRichText field={slice.primary.title} />
                </Box>

                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: { xs: '18px', md: '26px' },
                        maxWidth: '650px',
                        paddingTop: '18px',
                        margin: '0 auto',
                        fontWeight: '400',
                        lineHeight: { xs: '26px', md: '30px' },
                    }}
                >
                    {slice.primary.subtitle}
                </Typography>
            </section>
        </section>
    )
}

export default BlogsTitle

import { backgroundColorExtract } from '@/utils/color'
import { WidthFull } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type MultiLeftRightCoursesProps = SliceComponentProps<Content.MultiLeftRightCoursesSlice>

const MultiLeftRightCourses = ({ slice }: MultiLeftRightCoursesProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    height: '100%',
                    padding: { xs: '30px 20px', lg: '60px 50px' },
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
                    <Box
                        sx={{
                            color: '#000',
                            fontSize: { xs: '28px', md: '56px' },
                            textAlign: 'center',
                            fontWeight: '700',
                            maxWidth: '800px',
                            '&& p,h1,h2,h3,h4,h5,h6': {
                                fontSize: { xs: '28px', md: '56px' },
                                margin: '0px',
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: { xs: '18px', md: '36px' },
                            textAlign: 'center',
                            fontWeight: { xs: '400', lg: '600' },
                            marginTop: { xs: '14px', lg: '32px' },
                            maxWidth: '800px',
                        }}
                    >
                        {slice.primary.subtitle}
                    </Typography>
                    <Box sx={{ marginTop: { xs: '35px', lg: '50px' } }}>
                        {slice.primary.content.map((item, index) => (
                            <Box
                                key={index + (item?.content_title ?? '')}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column-reverse', sm: index % 2 === 0 ? 'row-reverse' : 'row' },
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: { xs: '50px', md: '100px' },
                                    width: '100%',
                                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                                    gap: { xs: '0px', md: '50px' },
                                }}
                            >
                                {/* Image Section */}
                                <Box
                                    sx={{
                                        display: { xs: 'none', lg: 'block' },
                                        maxWidth: { xs: '100%', sm: '448px' },
                                        position: 'relative',
                                        height: { xs: '200px', sm: '340px' },
                                        overflow: 'hidden',
                                        borderRadius: '20px',
                                        mb: { xs: 1, sm: 0 },
                                        flexGrow: 1,
                                    }}
                                >
                                    <PrismicNextImage
                                        field={item.content_image}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '20px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Content Section */}
                                <Box
                                    sx={{
                                        maxWidth: { xs: '100%', md: '100%' },
                                        p: 0,
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: { xs: '20px', lg: '0px' },
                                            alignItems: { xs: 'baseline', lg: index % 2 === 0 ? 'flex-start' : 'flex-end' },
                                            flexDirection: { xs: 'row', lg: 'column' },
                                        }}
                                    >
                                        <Box sx={{ width: '40px', height: '40px' }}>
                                            <PrismicNextImage field={item.icon} style={{ height: '100%', width: '100%' }} />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: '#000000',
                                                fontSize: { xs: '24px', md: '30px' },
                                                lineHeight: '80px',
                                                fontWeight: '700',
                                                textAlign: {
                                                    xs: 'center',
                                                    md: 'center',
                                                    lg: index % 2 === 0 ? 'left' : 'right',
                                                },
                                            }}
                                            gutterBottom
                                        >
                                            {item.content_title}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: { xs: 'block', lg: 'none' },
                                            maxWidth: { xs: '100%', sm: '448px' },
                                            position: 'relative',
                                            height: { xs: '100%', sm: '340px' },
                                            overflow: 'hidden',
                                            borderRadius: '20px',
                                            mb: { xs: 1, sm: 1, md: 1, lg: 0 },
                                            flexGrow: 1,
                                        }}
                                    >
                                        <PrismicNextImage
                                            field={item.content_image}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '20px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            color: '#000000',
                                            fontSize: { xs: '17px', md: '26px' },
                                            lineHeight: { xs: '28px', md: '34px' },
                                            fontWeight: '400',

                                            textAlign: {
                                                xs: 'left',
                                                md: 'left',
                                                lg: index % 2 === 0 ? 'left' : 'right',
                                            },
                                            '&& p,h1,h2,h3,h4,h5,h6': {
                                                margin: 0,
                                                display: { xs: 'inline', md: 'block' },
                                                fontSize: { xs: '17px', md: '26px' },
                                            },
                                        }}
                                    >
                                        <PrismicRichText field={item.content_description} />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                color: '#000000',
                                fontSize: { xs: '22px', lg: '38px' },
                                textAlign: 'center',
                                fontWeight: '700',
                                marginTop: '10px',
                                lineHeight: { xs: '32px', lg: '52px' },
                                '&& p': {
                                    margin: 0,
                                    lineHeight: { xs: '32px', lg: '52px' },
                                },
                                br: {
                                    display: 'none',
                                },
                            }}
                        >
                            {' '}
                            <PrismicRichText field={slice.primary.info_title} />
                        </Box>
                        <Box
                            sx={{
                                color: '#000000',
                                fontSize: { xs: '18px', lg: '32px' },
                                textAlign: 'center',
                                fontWeight: '400',
                                marginTop: { xs: '20px', lg: '37px' },
                                lineHeight: { xs: '26px', lg: '46px' },
                                '&& p': {
                                    fontSize: { xs: '18px', lg: '32px' },
                                    lineHeight: { xs: '26px', lg: '46px' },
                                    margin: 0,
                                    display: { xs: 'inline', lg: 'block' },
                                    wordWrap: 'break-word',
                                    whiteSpace: 'initial',
                                },
                                br: {
                                    display: 'none',
                                },
                            }}
                        >
                            {' '}
                            <PrismicRichText field={slice.primary.info_description} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default MultiLeftRightCourses

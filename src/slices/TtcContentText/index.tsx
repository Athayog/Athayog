import BackgroundColorLayout from '@/components/_shared/BackgroundColorLayout'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type TtcContentTextProps = SliceComponentProps<Content.TtcContentTextSlice>

const TtcContentText = ({ slice }: TtcContentTextProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <BackgroundColorLayout background_color={slice.primary.background_color}>
                <Box
                    sx={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: { xs: '22px', md: '34px' },
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: { xs: '30px', md: '46px' },
                        '&& p': {
                            margin: 0,
                            fontSize: { xs: '22px', md: '34px' },
                            lineHeight: { xs: '30px', md: '46px' },
                        },
                    }}
                >
                    <PrismicRichText field={slice.primary.title} />
                </Box>
                <Box
                    sx={{
                        color: '#000',
                        textAlign: 'center',
                        fontSize: { xs: '20px', md: '32px' },
                        marginTop: { xs: '20px', md: '32px' },
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: { xs: '22px', md: '46px' },
                        '&& p': {
                            margin: 0,
                        },
                    }}
                >
                    <PrismicRichText field={slice.primary.subtitle} />
                </Box>
                <Box
                    sx={{
                        marginTop: { xs: '50px', md: '100px' },
                        alignSelf: 'flex-start',
                    }}
                >
                    {slice.primary.description.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: { xs: '20px', md: '50px' } }}>
                            <Box
                                sx={{
                                    color: '#000',
                                    textAlign: 'left',
                                    fontSize: { xs: '32px', md: '52px' },
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: { xs: '48px', md: '64px' },
                                    '&& p': {
                                        margin: 0,
                                    },
                                }}
                            >
                                <PrismicRichText field={item.title} />
                            </Box>
                            <Box
                                sx={{
                                    color: '#000',
                                    textAlign: 'left',
                                    fontSize: { xs: '20px', md: '32px' },
                                    marginTop: { xs: '20px', md: '32px' },
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: { xs: '48px', md: '64px' },
                                    '&& p': {
                                        margin: 0,
                                    },
                                }}
                            >
                                <PrismicRichText field={item.description} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </BackgroundColorLayout>
        </section>
    )
}

export default TtcContentText

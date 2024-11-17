'use client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import RegisterButton from '@/components/elements/button/RegisterButton'
import theme from '@/styles/theme'
import ContentContainer from '@/components/_shared/ContentContainer'
import { Box, styled, Typography } from '@mui/material'
import { YouTubeEmbed } from '@next/third-parties/google'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { PrismicNextLink } from '@prismicio/next'
import Video from 'next-video'
import { LinkToMediaField } from '@prismicio/client'

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: '20px',
    textAlign: 'end',
    fontSize: '48px',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
        fontSize: '32px',
        textAlign: 'center',
        width: '100%',
    },
}))

/**
 * Props for `YogaArambha`.
 */
export type YogaArambhaProps = SliceComponentProps<Content.YogaArambhaSlice> &
    LinkToMediaField & {
        slice: {
            primary: {
                media: {
                    url: string
                }
            }
        }
    }

/**
 * Component for "YogaArambha" Slices.
 */
const YogaArambha = ({ slice }: YogaArambhaProps): JSX.Element => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <ContentContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        [theme.breakpoints.down('md')]: {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box sx={{ maxWidth: '550px', position: 'relative' }}>
                        <Title
                            sx={{
                                color: '#202020',
                                textAlign: 'left',
                                [theme.breakpoints.down('md')]: {
                                    marginTop: '0px',
                                },
                            }}
                        >
                            {slice.primary.title}
                        </Title>

                        <Box
                            sx={{
                                fontSize: '24px',
                                color: '#000',
                                marginTop: '34px',
                                [theme.breakpoints.down('md')]: {
                                    fontSize: '18px',
                                    marginTop: '20px',
                                },
                            }}
                        >
                            <PrismicRichText field={slice.primary.description} />
                        </Box>
                        {/* <Box
                            sx={{
                                display: 'flex',
                                gap: '20px',
                                marginTop: '27px',
                                [theme.breakpoints.down('md')]: {
                                    display: 'none',
                                },
                            }}
                        >
                            <PrismicNextLink field={slice.primary.button_link}>
                                <RegisterButton sx={{ width: 'max-content' }}>{slice.primary.button_text}</RegisterButton>
                            </PrismicNextLink>
                        </Box> */}
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: '270px',
                            height: '500px',
                            width: '436px',
                            border: '4px solid #F8BCC0',
                            padding: '55px',
                            backgroundColor: '#000',
                            overflow: 'hidden',
                            [theme.breakpoints.down('md')]: {
                                marginTop: '20px',
                                width: '100%',
                            },
                        }}
                    >
                        {slice.primary.media.url !== '' ? (
                            <>
                                <Video src={slice.primary.media.url} />
                            </>
                        ) : (
                            <YouTubeEmbed style="height: 520px;" videoid={slice.primary.youtube_embed_id ?? ''} params="controls=0" />
                        )}
                    </Box>
                </Box>
                {/* <Box
                    sx={{
                        display: 'none',
                        justifyContent: 'center',
                        marginTop: '27px',
                        [theme.breakpoints.down('md')]: {
                            display: 'flex',
                        },
                    }}
                >
                    <RegisterButton
                        sx={{
                            width: 'max-content',
                            [theme.breakpoints.down('md')]: {
                                margin: '0 auto',
                                fontSize: '18px',
                                height: '50px',
                                width: '300px',
                            },
                        }}
                    >
                        Dive Into Yoga Arambaha
                    </RegisterButton>
                </Box> */}
            </ContentContainer>
        </section>
    )
}

export default YogaArambha

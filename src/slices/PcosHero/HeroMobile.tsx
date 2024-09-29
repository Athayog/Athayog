import { Box } from '@mui/material'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { Subtitle, Title } from '@/components/_shared/Typography/PCOS'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { PrismicRichText } from '@prismicio/react'
const HeroMobile = ({
    button_link,
    button_text,
    subtitle,
    title,
    person_image,
}: {
    button_link: any
    button_text: any
    subtitle: any
    title: any
    person_image: any
}) => {
    return (
        <PCOSLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: '120px',
                }}
            >
                <Box sx={{ flexBasis: '50%' }}>
                    <Title>
                        <PrismicRichText field={title} />
                    </Title>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <PrismicNextLink field={button_link}>
                            <RegisterButton
                                sx={{
                                    background:
                                        'linear-gradient(0deg, #C32A58 0%, #C32A58 100%)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(0deg, #B22952 0%, #B22952 100%)',
                                        color: 'white',
                                    },
                                    height: '53px',
                                    marginRight: '20px',
                                    width: '211px',
                                    minWidth: 'content',
                                    fontSize: '22px',
                                    padding: '0px',
                                }}
                            >
                                {button_text}
                            </RegisterButton>
                        </PrismicNextLink>

                        <Box sx={{ position: 'relative' }}>
                            <Box
                                sx={{
                                    flexBasis: '50%',
                                    maxWidth: '600px',
                                    position: 'relative',
                                    height: 'auto',
                                    overflow: 'hidden',
                                }}
                            >
                                <PrismicNextImage
                                    field={person_image}
                                    layout="responsive"
                                    height={500}
                                    width={600}
                                    style={{
                                        WebkitTransform: 'scaleX(-1)', // for Safari
                                        transform: 'scaleX(-1)',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Subtitle>
                        {' '}
                        <PrismicRichText field={subtitle} />
                    </Subtitle>
                </Box>
            </Box>
        </PCOSLayout>
    )
}

export default HeroMobile

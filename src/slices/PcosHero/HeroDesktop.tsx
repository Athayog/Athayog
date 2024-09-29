import { Box } from '@mui/material'
import { PrismicRichText } from '@prismicio/react'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Subtitle, Title } from '@/components/_shared/Typography/PCOS'
import HeroVector from '/public/images/pcos-page/HeroVector.svg'
import RegisterButton from '@/components/elements/button/RegisterButton'

const HeroDesktop = ({
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
                    flexDirection: 'row',
                    gap: '50px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '80px',
                }}
            >
                <Box sx={{ flexBasis: '50%', maxWidth: '600px' }}>
                    <Title>
                        <PrismicRichText field={title} />
                    </Title>
                    <Subtitle>
                        <PrismicRichText field={subtitle} />
                    </Subtitle>
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
                            }}
                        >
                            {button_text}
                        </RegisterButton>
                    </PrismicNextLink>
                </Box>
                <Box
                    sx={{
                        flexBasis: '50%',
                        maxWidth: '600px',
                        position: 'relative',
                        height: 'auto',
                        overflow: 'hidden',
                    }}
                >
                    <HeroVector
                        style={{
                            position: 'absolute',
                            zIndex: '0',
                            opacity: '0.5',
                        }}
                    />
                    <PrismicNextImage
                        field={person_image}
                        layout="responsive"
                        height={500}
                        width={600}
                        style={{
                            WebkitTransform: 'scaleX(-1)', // for Safari
                            transform: 'scaleX(-1)',
                            zIndex: '2',
                        }}
                    />
                </Box>
            </Box>
        </PCOSLayout>
    )
}

export default HeroDesktop

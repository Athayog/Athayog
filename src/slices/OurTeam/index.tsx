'use client'
import { Box, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from '@/components/elements/button/Index'

export type OurTeamProps = any

const OurTeam = ({ slice }: OurTeamProps): JSX.Element => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const containerRef = useRef<HTMLDivElement | null>(null)

    const handleReadMore = (index: number) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    }

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        }
    }, [])

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: '#e0fad3',
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                }}
            >
                <Box
                    ref={containerRef}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: '24px', md: '52px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#2A5200',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>

                    <Box
                        sx={{
                            maxWidth: '1000px',
                            color: '#00000',
                            fontSize: { xs: '17px', md: '24px' },
                            fontWeight: '400',
                            lineHeight: { xs: '29px', md: '49px' },
                            textAlign: 'center',
                            marginTop: { xs: '14px', md: '26px' },
                        }}
                    >
                        <PrismicRichText field={slice.primary.description} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px', flexDirection: 'column', gap: '40px' }}>
                        {slice.primary.employee.map((item: any, index: number) => (
                            <Box
                                key={item.employee_name}
                                sx={{
                                    padding: { xs: '20px 25px', md: '30px 40px' },
                                    borderRadius: '12px',
                                    display: 'flex',
                                    backgroundColor: '#ecfce5',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: { xs: '20px', md: '80px' },
                                    flexDirection: { xs: 'column', md: 'row' },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: '100%', md: '368px' }, // Explicit square sizing for the box
                                        height: { xs: '100%', md: '368px' }, // Same height as width to ensure perfect circle
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        position: 'relative',
                                        border: '4px solid transparent',
                                        background: 'linear-gradient(45deg, #F8BCC0, #8CCE5F)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Centering the image perfectly inside the box
                                    }}
                                >
                                    <PrismicNextImage
                                        field={item.employee_image}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </Box>

                                <Box sx={{ width: { xs: '100%', md: '65%' }, marginTop: { xs: '0px', md: 0 }, display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ color: '#284E01', fontSize: { xs: '28px', md: '38px' }, fontWeight: '700', textAlign: { xs: 'center', md: 'left' } }}>
                                        {item.employee_name}
                                    </Typography>
                                    <Typography sx={{ color: '#284E01', fontSize: { xs: '20px', md: '30px' }, fontWeight: '600', textAlign: { xs: 'center', md: 'left' } }}>
                                        {item.employee_designation}
                                    </Typography>

                                    <Box
                                        sx={{
                                            maxHeight: expanded[index] ? 'none' : '6.5em',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontSize: { xs: '17px', md: '24px' },
                                            fontWeight: '400',
                                            lineHeight: { xs: '29px', md: '49px' },
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <PrismicRichText field={item.employee_details} />
                                    </Box>

                                    <Button
                                        onClick={() => handleReadMore(index)}
                                        sx={{
                                            color: '#fff',
                                            alignSelf: { xs: 'center', md: 'flex-end' },
                                            backgroundColor: '#47820D',
                                            marginTop: { xs: '30px', md: '30px' },
                                        }}
                                    >
                                        {expanded[index] ? 'Read Less' : 'Read More'}
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default OurTeam

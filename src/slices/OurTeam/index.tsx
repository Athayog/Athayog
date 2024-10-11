'use client'
import { Box, Typography } from '@mui/material'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { useState } from 'react'
import Button from '@/components/elements/button/Index'

export type OurTeamProps = any

const OurTeam = ({ slice }: OurTeamProps): JSX.Element => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const handleReadMore = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

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
                                        width: { xs: '300px', md: '368px' }, // Change sizes as necessary
                                        height: { xs: '300px', md: '368px' }, // Ensure width equals height
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        position: 'relative',
                                        margin: '0 auto',
                                        border: '4px solid transparent',
                                        background: 'linear-gradient(45deg, #F8BCC0, #8CCE5F)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
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
                                            fontSize: { xs: '17px', md: '24px' },
                                            fontWeight: '400',
                                            lineHeight: { xs: '29px', md: '49px' },
                                            marginTop: '10px',
                                            overflow: 'hidden',
                                            maxHeight: expandedIndex === index ? 'none' : '4.5em', // Adjust the maxHeight for 4 lines
                                            display: '-webkit-box',
                                            WebkitLineClamp: expandedIndex === index ? 'none' : 4, // Limits to 4 lines when collapsed
                                            WebkitBoxOrient: 'vertical',
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
                                        {expandedIndex === index ? 'Read Less' : 'Read More'}
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

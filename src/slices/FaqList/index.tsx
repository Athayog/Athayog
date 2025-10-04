'use client'
import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, List, accordionSummaryClasses } from '@mui/material'
import ListIcon from '/public/images/List.png'
import ListIconNonExpand from '/public/images/List Non Expand.png'
import Image from 'next/image'

export type FaqListProps = SliceComponentProps<Content.FaqListSlice>

const FaqList: FC<FaqListProps> = ({ slice }) => {
    const { title, faq_items } = slice.primary
    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Box component="section" data-slice-type={slice.slice_type} data-slice-varitation={slice.variation}
            sx={{
                background: 'linear-gradient(180deg, #FFF4EA 5.61%, #FFFFFF 34.53%, #EAFEDF 79.33%)',
                padding: { xs: '0px', md: '50px' },
                marginBottom: '-10px'
            }}
        >

            <Box sx={{
                background: "#fff",
                padding: { xs: "20px 0px", md: '40px 50px' },
                borderRadius: { xs: '0px', md: '50px' },
                maxWidth: { xs: '100%', md: "md" },
                margin: '0 auto'
            }}>
                {/* Title */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <PrismicRichText
                        field={title}
                        components={{
                            heading2: ({ children }) => (
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '27px', md: '45px' },
                                        mb: { xs: 0, md: 3 },
                                        fontFamily: 'var(--font-inter)',
                                        color: ' rgba(0, 71, 60, 1);'
                                    }}
                                >
                                    {children}
                                </Typography>
                            )
                        }}
                    />
                </Box>

                {/* FAQ Accordions */}
                <Box sx={{ width: '100%' }}>
                    {faq_items?.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            sx={{
                                mb: 2,
                                boxShadow: 0,
                                '&:before': { display: 'none' },
                                '&.Mui-expanded': { margin: 0, mb: 2 },
                                borderBottom: index === faq_items.length - 1 ? 'none' : '1px solid rgba(225, 220, 212, 1)',
                                borderRadius: '0px'
                            }}
                        >

                            <AccordionSummary
                                expandIcon={<Image src={ListIconNonExpand} alt="List Icon" width={24} height={24} />}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: '14px', md: '22px' },
                                    fontFamily: 'var(--font-poppins)',
                                    color: "rgba(0, 71, 60, 1)",
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row-reverse', // This moves icon to left
                                    '& .MuiAccordionSummary-expandIconWrapper': {
                                        marginRight: 1,
                                        marginLeft: 0
                                    },
                                    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
                                    {
                                        transform: 'rotate(45deg)',
                                    },
                                }}
                            >

                                <Typography variant="h6" component="h3" sx={{ fontWeight: 500, marginLeft: '10px', fontSize: { xs: '14px', md: '22px' }, fontFamily: 'var(--font-poppins)' }}>
                                    {item.question}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                <PrismicRichText
                                    field={item.answer}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    lineHeight: 1.6,
                                                    fontWeight: '400px',
                                                    fontSize: { xs: '13px', md: '20px' },
                                                    color: 'rgba(32, 32, 32, 1)',
                                                    fontFamily: 'var(--font-poppins)',
                                                }}
                                            >
                                                {children}
                                            </Typography>
                                        )
                                    }}
                                />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default FaqList
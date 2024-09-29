'use client'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { Title } from '@/components/_shared/Typography/PCOS'
import theme from '@/styles/theme'
import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
/**
 * Props for `YogaPractices`.
 */
export type YogaPracticesProps = SliceComponentProps<Content.YogaPracticesSlice>

/**
 * Component for "YogaPractices" Slices.
 */
const YogaPractices = ({ slice }: YogaPracticesProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box sx={{ background: '#FFD6E0' }}>
                <PCOSLayout>
                    <Box
                        sx={{
                            width: '100%',
                            padding: '20px',
                        }}
                    >
                        <Title>{slice.primary.title}</Title>
                        <Box
                            component="ul"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                justifyContent: 'flex-start',
                                padding: 0,
                                listStyle: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                {slice.primary.list.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            fontSize: '24px',
                                            marginLeft: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                fontSize: '18px',
                                            },
                                            '& p': {
                                                margin: 0,
                                            },
                                        }}
                                    >
                                        <PrismicRichText
                                            field={item.practice_item}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default YogaPractices

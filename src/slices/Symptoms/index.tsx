'use client'
import { PCOSLayout } from '@/components/_shared/PCOSLayout'
import { Title } from '@/components/_shared/Typography/PCOS'
import theme from '@/styles/theme'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Symptoms`.
 */
export type SymptomsProps = SliceComponentProps<Content.SymptomsSlice>

/**
 * Component for "Symptoms" Slices.
 */
const Symptoms = ({ slice }: SymptomsProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box sx={{ background: '#FFD6E0' }}>
                <PCOSLayout>
                    {' '}
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
                            {slice.primary.symptoms_list.map((item, index) => (
                                <Box
                                    key={index}
                                    component="li"
                                    sx={{
                                        flexBasis: 'calc(50% - 10px)', // 2 columns, items 1-3 left, 4-6 right
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px 0',
                                        [theme.breakpoints.down('md')]: {
                                            flexBasis: '100%', // 1 column per row on smaller screens
                                        },
                                    }}
                                >
                                    {/* Pink Dot */}
                                    <Box
                                        sx={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: '#C32A58', // Pink dot color
                                            flexShrink: 0,
                                        }}
                                    />
                                    {/* Text */}
                                    <Typography
                                        sx={{
                                            fontSize: '30px',
                                            color: '#333',
                                            fontWeight: '500',
                                            [theme.breakpoints.down('md')]: {
                                                fontSize: '18px',
                                            },
                                        }}
                                    >
                                        {item.symptom}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </PCOSLayout>
            </Box>
        </section>
    )
}

export default Symptoms

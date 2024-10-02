import Title from '@/components/_shared/Typography/Title'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ProsAndCons`.
 */
export type ProsAndConsProps = SliceComponentProps<Content.ProsAndConsSlice>

/**
 * Component for "ProsAndCons" Slices.
 */
const ProsAndCons = ({ slice }: ProsAndConsProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #dffad1, #cdf7c9)',
                    height: '100%',
                    padding: { xs: '30px 20px', md: '60px 50px' },
                }}
            >
                {' '}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '1400px',
                        margin: '60px auto 0px auto',
                    }}
                >
                    <Box
                        sx={{
                            fontSize: { xs: '24px', md: '48px' },
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#2A5200',
                            '&& p': {
                                margin: 0,
                            },
                        }}
                    >
                        <PrismicRichText field={slice.primary.title} />
                    </Box>

                    <Box
                        sx={{
                            borderRadius: { xs: '12px', md: '40px' },
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            overflow: 'hidden',
                            marginTop: '30px',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: { xs: '12px', md: '0px' },
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: '20px', md: '38px' },
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        color: '#3D7403',
                                    }}
                                >
                                    Pros
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    backgroundColor: '#F4FFE8',
                                    padding: {
                                        xs: '10px 0px',
                                        md: '20px 10px',
                                    },
                                    color: '#3D7403',
                                    height: '100%',
                                    fontSize: { xs: '14px', md: '20px' },
                                }}
                            >
                                <ol>
                                    {slice.primary.pros.map((item) => (
                                        <li
                                            key={item.item}
                                            style={{ marginTop: '10px' }}
                                        >
                                            {item.item}
                                        </li>
                                    ))}
                                </ol>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '20px', md: '0px' },
                                backgroundColor: '#fff',
                                borderRadius: { xs: '12px', md: '0px' },
                                overflow: 'hidden',
                            }}
                        >
                            <Box sx={{ padding: '10px' }}>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '20px', md: '38px' },
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        color: '#C42B2B',
                                    }}
                                >
                                    Cons
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: '#FFF1F1',
                                    padding: {
                                        xs: '10px 0px',
                                        md: '20px 10px',
                                    },
                                    color: '#C42B2B',
                                    height: '100%',
                                    fontSize: { xs: '14px', md: '20px' },
                                }}
                            >
                                <ol>
                                    {slice.primary.cons.map((item) => (
                                        <li
                                            key={item.item}
                                            style={{ marginTop: '10px' }}
                                        >
                                            {item.item}
                                        </li>
                                    ))}
                                </ol>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}

export default ProsAndCons

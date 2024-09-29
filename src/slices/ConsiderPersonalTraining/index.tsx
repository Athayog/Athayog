import { Box, Typography } from '@mui/material'
import { KeyTextField, RichTextField } from '@prismicio/client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ConsiderPersonalTraining`.
 */
export type ConsiderPersonalTrainingProps =
    SliceComponentProps<Content.ConsiderPersonalTrainingSlice>

/**
 * Component for "ConsiderPersonalTraining" Slices.
 */

const TrainingBox = ({
    title,
    description,
}: {
    title: KeyTextField | null
    description: RichTextField | null
}) => {
    return (
        <Box
            sx={{
                borderRadius: '8px',
                background: '#FFEEEC',
                padding: '20px',
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                maxWidth: { xs: '100%', lg: '620px' },
            }}
        >
            <Typography
                sx={{
                    color: '#00000',
                    fontSize: { xs: '17px', md: '30px' },
                    fontWeight: '700',
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    color: '#00000',
                    fontSize: { xs: '17px', md: '30px' },
                    fontWeight: '400',
                    marginTop: { xs: '14px', md: '26px' },
                }}
            >
                <PrismicRichText field={description} />
            </Box>
        </Box>
    )
}
const ConsiderPersonalTraining = ({
    slice,
}: ConsiderPersonalTrainingProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #E7FAE3, #e7ead8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '40px 20px', lg: '60px 130px' },
                    gap: '50px',
                    margin: '-1',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        sx={{
                            color: '#284E01',
                            fontSize: { xs: '33px', md: '42px' },
                            fontWeight: '700',
                        }}
                    >
                        {slice.primary.title}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#284E01',
                            fontSize: { xs: '18px', md: '38px' },
                            fontWeight: '400',
                        }}
                    >
                        {slice.primary.subtitle}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3,
                    }}
                >
                    {slice.primary.content.map((item, index) => (
                        <TrainingBox key={index} {...item} />
                    ))}
                </Box>
            </Box>
        </section>
    )
}

export default ConsiderPersonalTraining

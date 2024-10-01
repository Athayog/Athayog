import { Box, Typography } from '@mui/material'
import { KeyTextField } from '@prismicio/client'
import { Content, RichTextField } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `GroupClassFormat`.
 */
export type GroupClassFormatProps =
    SliceComponentProps<Content.GroupClassFormatSlice>

/**
 * Component for "GroupClassFormat" Slices.
 */

const TrainingBox = ({
    content_title,
    content_description,
}: {
    content_title: KeyTextField | null
    content_description: RichTextField | null | undefined
}) => {
    return (
        <Box
            sx={{
                borderRadius: '8px',
                border: '2px solid rgba(145, 216, 154, 0.50)',
                background: '#D3F2C4',
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
                {content_title}
            </Typography>
            <Box
                sx={{
                    color: '#00000',
                    fontSize: { xs: '17px', md: '30px' },
                    fontWeight: '400',
                    marginTop: { xs: '14px', md: '26px' },
                }}
            >
                <PrismicRichText field={content_description} />
            </Box>
        </Box>
    )
}
const GroupClassFormat = ({ slice }: GroupClassFormatProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: '#E7FAE3',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '40px 20px', lg: '60px 130px' },
                    gap: { xs: '30px', md: '50px' },
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
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3,
                        maxWidth: { xs: '100%', md: '1440px' },
                        margin: '0 auto',
                    }}
                >
                    {slice.primary.content.map((item) => (
                        <TrainingBox key={item.content_title} {...item} />
                    ))}
                </Box>
            </Box>
        </section>
    )
}

export default GroupClassFormat

import { Box, Typography } from '@mui/material'
import { RichTextField } from '@prismicio/client'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `PersonalContent`.
 */
export type PersonalContentProps =
    SliceComponentProps<Content.PersonalContentSlice>

/**
 * Component for "PersonalContent" Slices.
 */

const Details = ({
    title,
    description,
}: {
    title: RichTextField | null
    description: RichTextField | null
}) => {
    return (
        <Box sx={{ maxWidth: '1000px', textAlign: 'center' }}>
            <Box
                sx={{
                    color: '#284E01',
                    fontSize: { xs: '33px', md: '42px' },
                    fontWeight: '700',
                }}
            >
                <PrismicRichText field={title} />
            </Box>
            <Box
                sx={{
                    fontSize: { xs: '18px', md: '26px' },
                    marginTop: { xs: '30px', md: '40px' },
                }}
            >
                <PrismicRichText field={description} />
            </Box>
        </Box>
    )
}

const PersonalContent = ({ slice }: PersonalContentProps): JSX.Element => {
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
                    padding: { xs: '20px', md: '60px 130px' },
                    gap: '50px',
                }}
            >
                {slice.primary.content.map((item, index) => (
                    <Details key={index} {...item} />
                ))}
            </Box>
        </section>
    )
}

export default PersonalContent

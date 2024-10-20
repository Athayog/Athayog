import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { backgroundColorExtract } from '@/utils/color'
import { Box } from '@mui/material'

export type GurusProps = SliceComponentProps<Content.GurusSlice>

const Gurus = ({ slice }: GurusProps): JSX.Element => {
    const backgroundGradient = backgroundColorExtract(slice.primary.background_color.map((item) => item.color))
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box
                sx={{
                    background: backgroundGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: '20px 10px', md: '60px 130px' },
                }}
            ></Box>
        </section>
    )
}

export default Gurus

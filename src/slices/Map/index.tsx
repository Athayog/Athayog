import { Box } from '@mui/material'
import { Content } from '@prismicio/client'
import { FC } from 'react'
import { SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'

/**
 * Props for `Map`.
 */
export type MapProps = SliceComponentProps<Content.MapSlice>

/**
 * Component for "Map" Slices.
 */
const Map: FC<MapProps> = ({ slice }) => {
    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Box sx={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: { xs: '20px', md: '100px' } }}>
                <Image
                    src={slice?.primary?.map?.url || ''}
                    alt="Map"
                    width={600}
                    height={500}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
            </Box>
        </section>
    )
}

export default Map

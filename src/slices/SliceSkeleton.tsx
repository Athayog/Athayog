'use client'

import { Box, Skeleton } from '@mui/material'

export default function SliceSkeleton({ height = '400px' }: { height?: string }) {
    return (
        <Box sx={{ width: '100%', py: 4, px: { xs: 2, md: 4 } }}>
            <Skeleton variant="text" width="60%" height={48} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="40%" height={32} sx={{ mx: 'auto', mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={height} sx={{ borderRadius: 2 }} />
        </Box>
    )
}

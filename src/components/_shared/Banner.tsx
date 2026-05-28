'use client'

import { Box, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'

interface BannerProps {
    imageSrc: {
        xs?: string | null
        sm?: string | null
        md?: string | null
        lg?: string | null
        xl?: string | null
    }
    imageAlt: string | null | undefined
    height: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string }
    children: React.ReactNode
    blurHash: string
    objectPosition: {
        xs?: string
        sm?: string
        md?: string
        lg?: string
        xl?: string
    }
    minHeight?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string }
}

const Banner: React.FC<BannerProps> = ({ imageSrc, imageAlt, height, objectPosition, children, blurHash, minHeight }) => {
    const theme = useTheme()
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

    const src = isLgUp ? (imageSrc.lg || imageSrc.md || imageSrc.sm || imageSrc.xs)
        : isMdUp ? (imageSrc.md || imageSrc.sm || imageSrc.xs)
        : (imageSrc.xs)

    const pos = isLgUp ? (objectPosition.lg || objectPosition.md || objectPosition.xs)
        : isMdUp ? (objectPosition.md || objectPosition.xs)
        : (objectPosition.xs)

    if (!src) return null

    return (
        <Box sx={{ position: 'relative', height, overflow: 'hidden', minHeight: minHeight ?? '100%' }}>
            <Image
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: pos,
                }}
                src={src}
                blurDataURL={blurHash}
                placeholder="blur"
                alt={imageAlt ?? 'Image'}
            />
            <Box
                sx={{
                    position: 'relative',
                    color: 'white',
                    height: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default Banner

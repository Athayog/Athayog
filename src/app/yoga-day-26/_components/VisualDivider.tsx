'use client'

import { Box } from '@mui/material'
import Image from 'next/image'

export function VisualDivider() {
    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 240, sm: 320, md: 420 },
                overflow: 'hidden',
                // base colour split: top half matches WhySection, bottom matches ExperienceSection
                // visible if image fails to load
                background: 'linear-gradient(to bottom, #f1f5ee 50%, #ffffff 50%)',
            }}
        >
            {/* Immersive Wide Event Image */}
            <Image src="/images/yoga-day-26/Framesbyadrian-15.jpg" alt="Mass Yoga Gathering and Community Mat Layout" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.9 }} loading="lazy" />

            {/*
             * Top edge: solid #f1f5ee (WhySection bgcolor) → transparent
             * Bottom edge: transparent → solid #ffffff (ExperienceSection bgcolor)
             * The two transparent midpoints must match so they don't clash in the centre.
             * Using a generous 30% fade on each end so the transition is gradual.
             */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #f1f5ee 0%, rgba(241,245,238,0) 30%, rgba(255,255,255,0) 70%, #ffffff 100%)',
                    pointerEvents: 'none',
                }}
            />
        </Box>
    )
}

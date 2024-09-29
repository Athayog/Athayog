'use client'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import HeroMobile from '@/slices/PcosHero/HeroMobile'
import HeroDesktop from '@/slices/PcosHero/HeroDesktop'
import { styled } from '@mui/system'
import { Gradient } from '@/components/_shared/Typography/PCOS'
import { Box } from '@mui/material'
import PCOSBackground from '/public/images/pcos-page/PCOSBackground.jpeg'

const MobileWrapper = styled('div')(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}))

const DesktopWrapper = styled('div')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}))
/**
 * Props for `PcosHero`.
 */
export type PcosHeroProps = SliceComponentProps<Content.PcosHeroSlice>

/**
 * Component for "PcosHero" Slices.
 */
const PcosHero = ({ slice }: PcosHeroProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background:
                        'url(' +
                        PCOSBackground.src +
                        ') no-repeat center center / cover',
                }}
            >
                <Gradient />
                <MobileWrapper>
                    <HeroMobile {...slice.primary} />
                </MobileWrapper>
                <DesktopWrapper>
                    <HeroDesktop {...slice.primary} />
                </DesktopWrapper>
            </Box>
        </section>
    )
}

export default PcosHero

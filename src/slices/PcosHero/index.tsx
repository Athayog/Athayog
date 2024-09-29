'use client'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import HeroMobile from '@/slices/PcosHero/HeroMobile'
import HeroDesktop from '@/slices/PcosHero/HeroDesktop'
import { styled } from '@mui/system'
import { Gradient } from '@/components/_shared/Typography/PCOS'
import { Box } from '@mui/material'

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
                        ' linear-gradient(56deg, rgba(220, 84, 141, 1) 0%, rgba(254,186,207,1) 23%, rgba(255,189,206,1) 32%, rgba(254,202,204,1) 49%, rgba(254,208,208,1) 63%, rgba(254,184,209,1) 80%, rgba(253,211,215,1) 86%, rgba(254,199,231,1) 100%)',
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

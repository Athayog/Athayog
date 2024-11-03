'use client'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import { Paper, Typography } from '@mui/material'
import { SectionContent, SectionPadding } from '@/components/_shared/SectionContainer'
import Image from 'next/image'
import { LayoutContainer, LayoutContent } from '../_shared/LayoutContainer'
import { Key, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const StatBox = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',

    width: '200px',
    [theme.breakpoints.down('md')]: {
        backgroundColor: '#eff3e4',
        borderRadius: '7.978px ',
        width: '120px',
    },
    svg: {
        width: '45px',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '35px',
        },
    },
}))

const StatCount = styled(Typography)(({ theme }) => ({
    fontSize: '60px',
    color: '#416c27',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('md')]: {
        fontSize: '46px',
        margin: 0,
    },
}))

const StatName = styled(Typography)(({ theme }) => ({
    fontSize: '26px',
    color: '#404040',
    [theme.breakpoints.down('md')]: {
        fontSize: '17px',
    },
}))

// Component
export default function Stats({ statsData }: any) {
    const countRefs = useRef<(HTMLDivElement | null)[]>([]) // Array to store refs to each count element

    useEffect(() => {
        // Animate each count when it scrolls into view
        gsap.registerPlugin(ScrollTrigger)
        countRefs.current.forEach((el, index) => {
            if (el) {
                const finalValue = statsData[index].count // Get the final value for the count

                gsap.fromTo(
                    el,
                    { innerText: 0 }, // Start value
                    {
                        innerText: finalValue,
                        duration: 2, // Animation duration
                        ease: 'power1.out',
                        snap: { innerText: 1 }, // Snap to integers during the animation
                        onUpdate: function () {
                            el.innerText = Math.ceil(+el.innerText).toString() // Ensure we only display whole numbers
                        },
                        scrollTrigger: {
                            trigger: el, // Trigger animation when this element comes into view
                            start: 'top 80%', // When 80% of the element is in the viewport
                            toggleActions: 'play none none none', // Play animation when scrolled into view
                        },
                    }
                )
            }
        })

        return () => {
            // Cleanup ScrollTriggers when component unmounts
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [statsData])

    return (
        <LayoutContainer>
            <LayoutContent>
                <SectionPadding>
                    <SectionContent>
                        <Grid container spacing={4} gap={{ xs: '20px', md: '30px', lg: '80px' }} justifyContent="center" component="div">
                            {statsData.map((stat: any, index: number) => {
                                const Icon = stat.icon.url
                                return (
                                    <Grid key={index} component="div">
                                        <StatBox>
                                            <Image src={Icon} width={stat.icon.dimensions.width} height={stat.icon.dimensions.height} alt={stat.icon.alt} />
                                            <StatCount
                                                ref={(el) => {
                                                    if (el) {
                                                        countRefs.current[index] = el as HTMLDivElement
                                                    }
                                                }}
                                            >
                                                {stat.count}+
                                            </StatCount>
                                            <StatName>{stat.label}</StatName>
                                        </StatBox>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </SectionContent>
                </SectionPadding>
            </LayoutContent>
        </LayoutContainer>
    )
}

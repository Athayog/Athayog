'use client'

import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { yogaTheme } from './_components/theme'
import { HeroSection } from './_components/HeroSection'
import { ScheduleSection } from './_components/ScheduleSection'
import { WhySection } from './_components/WhySection'
import { ExperienceSection } from './_components/ExperienceSection'
import { ActivitiesSection } from './_components/ActivitiesSection'
import { AboutSection } from './_components/AboutSection'
import { ClientsSection } from './_components/ClientsSection'
import { LocationSection } from './_components/LocationSection'
import { RegisterSection } from './_components/RegisterSection'
import { FaqSection } from './_components/FaqSection'
import { FinalCtaSection } from './_components/FinalCtaSection'

export default function YogaArambha2026Page() {
    return (
        <ThemeProvider theme={yogaTheme}>
            <Box sx={{ minHeight: '100vh', bgcolor: '#faf7f2' }}>
                <main>
                    <HeroSection />
                    <ScheduleSection />
                    <WhySection />
                    <ExperienceSection />
                    <ActivitiesSection />
                    <AboutSection />
                    <ClientsSection />
                    <LocationSection />
                    <RegisterSection />
                    <FaqSection />
                    <FinalCtaSection />
                </main>
            </Box>
        </ThemeProvider>
    )
}

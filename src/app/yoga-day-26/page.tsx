import ClientWrapper from './_components/ClientWrapper'
import { HeroSection } from './_components/HeroSection'
import { ScheduleSection } from './_components/ScheduleSection'
import { WhySection } from './_components/WhySection'
import { ExperienceSection } from './_components/ExperienceSection'
import { VisualDivider } from './_components/VisualDivider'
import { ActivitiesSection } from './_components/ActivitiesSection'
import { GallerySection } from './_components/GallerySection'
import { AboutSection } from './_components/AboutSection'
import { LocationSection } from './_components/LocationSection'
import { RegisterSection } from './_components/RegisterSection'
import { FaqSection } from './_components/FaqSection'
import { FinalCtaSection } from './_components/FinalCtaSection'

export const metadata = {
    title: 'Yoga Arambha 2026 | International Day of Yoga Celebration',
    description: 'Join Athayog for Bengaluru’s largest International Day of Yoga celebration at Indiranagar Club. Free registration, mass yoga session, and wellness community.',
}

export default function YogaArambha2026Page() {
    return (
        <ClientWrapper>
            <main>
                <HeroSection />
                <ScheduleSection />
                <WhySection />
                <VisualDivider />
                <ExperienceSection />
                <ActivitiesSection />
                <GallerySection />
                <AboutSection />
                <LocationSection />
                <RegisterSection />
                <FaqSection />
                <FinalCtaSection />
            </main>
        </ClientWrapper>
    )
}

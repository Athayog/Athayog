'use client'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import ForumIcon from '@mui/icons-material/Forum'
import GavelIcon from '@mui/icons-material/Gavel'
import HomeIcon from '@mui/icons-material/Home'
import NightlightIcon from '@mui/icons-material/Nightlight'
import RepeatIcon from '@mui/icons-material/Repeat'
import ScheduleIcon from '@mui/icons-material/Schedule'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Box } from '@mui/material'
import BentoGridSection from '../BentoGridSection'
import FAQCTASection from '../FAQCTASection'
import FeatureSection from '../FeatureSection'
import IconListSection from '../IconListSection'
import ImageFeatureSection from '../ImageFeatureSection'
import NumberedListSection from '../NumberedListSection'
import SplitContentSection from '../SplitContentSection'
import TestimonialCTASection from '../TestimonialCTASection'
import YogaProgramHero from '../YogaProgramHero'
import bacgroundImage from '/public/images/Sample.png'
import Sample4 from '/public/images/Sample (4).png'
import Image2 from '/public/images/mental-health/2.png'
import Image1 from '/public/images/mental-health/1.png'
import Image3 from '/public/images/mental-health/3.png'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Residential Yoga Program in Bangalore for Deep, Structured Yogic Living"
                description="An immersive residential yoga program designed for individuals seeking discipline, clarity, and inner transformation through a structured yogic lifestyle."
                features={['Full residential stay', 'Structured daily routine', 'Guided asana, pranayama & meditation', 'Limited intake for depth and focus']}
                ctaButtonText="Check Eligibility & Program Availability"
                submitButtonText="Submit"
                submittingButtonText="Submitting..."
                formSubmitUrl="/api/submit-form"
                namePlaceholder="Name"
                emailPlaceholder="Email"
                phonePlaceholder="Phone number"
                messagePlaceholder="Your message"
                successMessage="Thank you! We will contact you soon."
                errorMessage="Something went wrong. Please try again."
                backgroundImage={bacgroundImage}
                ctaButtonHref="/register/residential-form"
            />

            <FeatureSection
                title="Who This Residential Yoga Program Is For"
                cards={[
                    {
                        icon: <SentimentVeryDissatisfiedIcon />,
                        title: 'Feel mentally, emotionally, or physically exhausted',
                    },
                    {
                        icon: <DoNotDisturbOnIcon />,
                        title: 'Want to step away from daily distractions completely',
                    },
                    {
                        icon: <ScheduleIcon />,
                        title: 'Are seeking discipline, silence, and a structured routine',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Are open to guided yogic living',
                    },
                    {
                        icon: <HomeIcon />,
                        title: 'Can commit to staying residential for the program duration',
                    },
                ]}
            />

            <ImageFeatureSection
                title="What Is a Residential Yoga Program at AthaYog Living?"
                description="A residential yoga program at AthaYog Living is a full-time, immersive yogic experience where participants live on campus and follow a structured daily routine guided by experienced instructors."
                image={Image2}
                imageAlt="Group of people practicing yoga in a peaceful studio"
                features={[
                    {
                        icon: <GavelIcon />,
                        text: 'Yogic discipline over convenience',
                    },
                    {
                        icon: <RepeatIcon />,
                        text: 'Consistency over flexibility',
                    },
                    {
                        icon: <DeviceHubIcon />,
                        text: 'Lifestyle integration over isolated sessions',
                    },
                ]}
            />

            <BentoGridSection
                autoLayout={false} // ← Disable auto-layout
                cards={[
                    // ROW 1: 4 + 4 + 4 = 12 columns ✅
                    {
                        id: 'title',
                        type: 'title',
                        title: 'A Typical Day in the Residential Program',
                        gridSize: { xs: 12, sm: 12, md: 4, lg: 4 }, // 4 columns
                    },
                    {
                        id: 'morning',
                        type: 'icon',
                        icon: <WbSunnyIcon />,
                        text: 'Morning asana and pranayama practice',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 }, // 4 columns
                    },
                    {
                        id: 'silence',
                        type: 'text-image-side',
                        text: 'Periods of silence and reflection',
                        image: Image1, // Your image
                        imageAlt: 'Pranayama practice',
                        imagePosition: 'right',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 }, // 4 columns
                    },

                    // ROW 2: 5 + 3 + 4 = 12 columns ✅
                    {
                        id: 'learning',
                        type: 'text-image-side',
                        text: 'Guided learning and practice sessions',
                        image: Image3, // Your image
                        imageAlt: 'Guided learning',
                        imagePosition: 'left',
                        gridSize: { xs: 12, sm: 6, md: 5, lg: 5 }, // 5 columns
                    },
                    {
                        id: 'meals',
                        type: 'text',
                        text: 'Mindful meals and rest',
                        gridSize: { xs: 12, sm: 6, md: 3, lg: 3 }, // 3 columns
                    },
                    {
                        id: 'evening',
                        type: 'icon',
                        icon: <NightlightIcon />,
                        text: 'Evening practices and relaxation',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 }, // 4 columns
                    },

                    // ROW 3: 12 columns ✅
                    {
                        id: 'rest',
                        type: 'text',
                        text: 'Early rest to support discipline',
                        gridSize: { xs: 12, sm: 12, md: 12, lg: 12 }, // Full width
                    },
                ]}
            />
            <NumberedListSection
                title="Why Residential Practice Creates Deeper Change"
                subtitle="True change requires removal from distractions."
                items={[
                    {
                        id: '1',
                        text: 'Detachment from constant stimulation',
                    },
                    {
                        id: '2',
                        text: 'Resetting of habits and routines',
                    },
                    {
                        id: '3',
                        text: 'Deeper awareness of body and breath',
                    },
                    {
                        id: '4',
                        text: 'Mental clarity through disciplined living',
                    },
                ]}
            />

            <SplitContentSection
                title="Who Typically Chooses This Program"
                titleImage={Sample4}
                titleImageAlt="Peaceful yoga studio"
                items={[
                    { id: '1', text: 'Burned-out professionals seeking clarity' },
                    { id: '2', text: 'Entrepreneurs and founders at transition points' },
                    { id: '3', text: 'Individuals facing emotional or lifestyle shifts' },
                    { id: '4', text: 'Serious yoga aspirants wanting depth' },
                    { id: '5', text: 'People seeking long-term mental balance' },
                ]}
            />
            <IconListSection
                title="Guided, Safe, and Supportive Environment"
                items={[
                    {
                        id: '1',
                        text: 'Experienced instructors',
                    },
                    {
                        id: '2',
                        text: 'Safe, progressive practice',
                    },
                    {
                        id: '3',
                        text: 'Clear daily structure',
                    },
                    {
                        id: '4',
                        text: 'Supportive residential environment',
                    },
                ]}
            />

            <FeatureSection
                title="Program Duration & Commitment"
                cards={[
                    {
                        icon: <ScheduleIcon />,
                        title: 'Multiple duration options',
                    },
                    {
                        icon: <GavelIcon />,
                        title: 'Intentional commitment levels',
                    },
                    {
                        icon: <ForumIcon />,
                        title: 'Suitability discussion before enrollment',
                    },
                    {
                        icon: <DoNotDisturbOnIcon />,
                        title: 'No pressure to join if not aligned',
                    },
                ]}
            />

            <TestimonialCTASection
                ctaButtonText="Discuss Program Fit & Duration"
                ctaButtonHref="/contact"
                sectionTitle="Participant Experiences"
                testimonials={[
                    {
                        id: '1',
                        text: `The structure brought clarity I hadn't experienced in years.`,
                    },
                    {
                        id: '2',
                        text: 'This was not a retreat. It was a disciplined reset of my lifestyle.',
                    },
                    {
                        id: '3',
                        text: 'Living the routine changed how I relate to my work and mind.',
                    },
                ]}
                finalText="Real people. Real commitment. Real inner shifts."
            />
            <FAQCTASection
                sectionTitle="Frequently Asked Questions"
                faqs={[
                    {
                        id: '1',
                        question: 'Is this a retreat or a long-term program?',
                        answer: 'This is a structured residential yoga program, not a leisure retreat.',
                    },
                    {
                        id: '2',
                        question: 'Do I need prior yoga experience?',
                        answer: 'No. Beginners and experienced practitioners are both guided appropriately.',
                    },
                    {
                        id: '3',
                        question: 'What level of discipline is expected?',
                        answer: 'Participants are expected to follow the daily routine sincerely.',
                    },
                    {
                        id: '4',
                        question: 'Is accommodation included?',
                        answer: 'Yes. This is a fully residential program with stay included.',
                    },
                    {
                        id: '5',
                        question: 'How do I know if this program is right for me?',
                        answer: 'Our team will help assess suitability before enrollment.',
                    },
                ]}
                subtext="Step Away From Noise. Step Into Structure."
                primaryCtaText="Check Eligibility & Speak to a Program Advisor"
                secondaryCtaText="Or WhatsApp Us for initial guidance"
                onSecondaryCtaClick={() => {
                    const phoneNumber = '+919611771434'
                    const whatsappUrl = `https://wa.me/${phoneNumber}`
                    window.open(whatsappUrl, '_blank')
                }}
                onPrimaryCtaClick={() => {
                    const phoneNumber = '+919611771434'
                    window.open(`tel:${phoneNumber}`, '_self')
                }}
            />
        </Box>
    )
}

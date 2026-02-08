'use client'
import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import ForumIcon from '@mui/icons-material/Forum'
import GavelIcon from '@mui/icons-material/Gavel'
import HomeIcon from '@mui/icons-material/Home'
import NightlightIcon from '@mui/icons-material/Nightlight'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import PsychologyIcon from '@mui/icons-material/Psychology'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import GroupsIcon from '@mui/icons-material/Groups'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RepeatIcon from '@mui/icons-material/Repeat'
import ScheduleIcon from '@mui/icons-material/Schedule'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import PublicIcon from '@mui/icons-material/Public'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import LocationOffIcon from '@mui/icons-material/LocationOff'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import SchoolIcon from '@mui/icons-material/School'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import VerifiedIcon from '@mui/icons-material/Verified'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
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
import bacgroundImage from '/public/images/landing-page-hero-1.jpg'
import Sample4 from '/public/images/Sample (4).png'
import Image2 from '/public/images/mental-health/2.png'
import Image1 from '/public/images/mental-health/1.png'
import Image3 from '/public/images/mental-health/3.png'
import LearningAreasSection from '../LearningAreasSection'
import ComparisonSection from '../ComparisonSection'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Non-Residential Yoga Program in Bangalore"
                description="A structured non-residential yoga program designed for working professionals and serious practitioners who want discipline, continuity, and real progress without residential stay."
                features={['Structured curriculum', 'Morning & evening batches', 'Guided asana, pranayama & meditation', 'Limited batch intake for focused learning']}
                ctaButtonText="Check Program Fit & Availability"
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
                ctaButtonHref="/register/non-residential-form"
            />

            <FeatureSection
                title="What Is a Non-Residential Yoga Program?"
                description="A non-residential yoga program allows you to follow a structured and disciplined yoga practice without staying at the center."
                cards={[
                    {
                        icon: <DirectionsRunIcon />,
                        title: 'Attend guided sessions at the studio',
                    },
                    {
                        icon: <AccountTreeIcon />,
                        title: 'Follow a fixed learning structure',
                    },
                    {
                        icon: <WorkOutlineIcon />,
                        title: 'Maintain your professional and personal life',
                    },
                    {
                        icon: <TrendingUpIcon />,
                        title: 'Build consistency without relocation',
                    },
                ]}
            />

            <NumberedListSection
                title="How the Program Works"
                variant="minimal"
                subtitle="The training follows a clear, guided flow to ensure steady learning, proper support, and realistic integration with daily life."
                items={[
                    {
                        id: '1',
                        text: 'Initial consultation to understand your goals, experience level, and availability',
                    },
                    {
                        id: '2',
                        text: 'Batch allocation into morning or evening sessions based on suitability',
                    },
                    {
                        id: '3',
                        text: 'Guided asana practice with emphasis on alignment, stability, and gradual strength building',
                    },
                    {
                        id: '4',
                        text: 'Pranayama and breath awareness to support regulation, balance, and inner steadiness',
                    },
                    {
                        id: '5',
                        text: 'Meditation and relaxation practices to develop focus, calm, and mental clarity',
                    },
                    {
                        id: '6',
                        text: 'Progressive learning through a structured and continuous training approach',
                    },
                ]}
            />

            {/* DONE */}

            <ImageFeatureSection
                title="Batch Timings Designed Around Work Life"
                description="The program schedule is structured to support consistency without disrupting professional responsibilities."
                image={Image3}
                imageAlt="Online yoga class with instructor guiding students"
                features={[
                    {
                        icon: <WbSunnyIcon />,
                        text: 'Morning batches for early-day clarity and sustained energy',
                    },
                    {
                        icon: <NightsStayIcon />,
                        text: 'Evening batches to release stress and unwind after work',
                    },
                    {
                        icon: <ScheduleIcon />,
                        text: 'Fixed timings to build discipline and regularity',
                    },
                    {
                        icon: <GroupsIcon />,
                        text: 'Small batch sizes for focused guidance and interaction',
                    },
                ]}
                ctaText="Check Available Batches"
                ctaHref="/batches"
            />

            <ComparisonSection
                mainTitle="Why This Is Not a Regular Yoga Class"
                subtitle="This program focuses on commitment and outcomes."
                leftColumn={{
                    title: 'Regular Yoga Classes',
                    items: [
                        { id: '1', text: 'Drop-in format' },
                        { id: '2', text: 'No learning structure' },
                        { id: '3', text: 'Inconsistent attendance' },
                        { id: '4', text: 'Limited progression' },
                    ],
                }}
                rightColumn={{
                    title: 'AthaYog Non-Residential Program',
                    items: [
                        { id: '1', text: 'Structured curriculum' },
                        { id: '2', text: 'Guided learning path' },
                        { id: '3', text: 'Consistent batch schedule' },
                        { id: '4', text: 'Long-term physical and mental benefits' },
                    ],
                }}
            />

            <FeatureSection
                title="Who Typically Chooses This Program"
                cards={[
                    {
                        icon: <WorkOutlineIcon />,
                        title: 'Working professionals managing stress and burnout',
                    },
                    {
                        icon: <PsychologyIcon />,
                        title: 'Entrepreneurs seeking mental clarity',
                    },
                    {
                        icon: <RestartAltIcon />,
                        title: 'Individuals restarting yoga after a long break',
                    },
                    {
                        icon: <SchoolIcon />,
                        title: 'Beginners who want to learn yoga properly',
                    },
                    {
                        icon: <FavoriteBorderIcon />,
                        title: 'Long-term wellness seekers',
                    },
                ]}
            />

            <SplitContentSection
                title="Program Duration, Commitment & Investment"
                titleImage={Sample4}
                titleImageAlt="Peaceful yoga studio"
                items={[
                    { id: '1', text: 'Multiple duration options available' },
                    { id: '2', text: 'Monthly and long-term plans' },
                    { id: '3', text: 'Fees depend on batch and commitment period' },
                    { id: '4', text: 'Orientation or trial discussion before enrollment' },
                ]}
            />

            <TestimonialCTASection
                ctaButtonText=" Get Program Details & Fee Structure"
                ctaButtonHref="/contact"
                sectionTitle="What Participants Share"
                testimonials={[
                    {
                        id: '1',
                        text: `This structure finally helped me stay consistent alongside work.`,
                    },
                    {
                        id: '2',
                        text: 'It’s not a casual class — the discipline changed my routine.',
                    },
                    {
                        id: '3',
                        text: 'I wanted serious yoga without staying residential. This worked perfectly.',
                    },
                ]}
                finalText="Real people. Real routines. Real progress."
            />
            <FAQCTASection
                sectionTitle="Frequently Asked Questions"
                faqs={[
                    {
                        id: '1',
                        question: 'Is accommodation included?',
                        answer: 'No. This is a non-residential yoga program. Participants attend sessions and return home.',
                    },
                    {
                        id: '2',
                        question: 'Can beginners join?',
                        answer: 'Yes. Beginners are guided step by step with a strong focus on building proper foundations.',
                    },
                    {
                        id: '3',
                        question: 'What if I miss a session?',
                        answer: 'Guidance is provided to help maintain continuity wherever possible.',
                    },
                    {
                        id: '4',
                        question: 'Is this suitable for working professionals?',
                        answer: 'Yes. The program is specifically designed around working schedules.',
                    },
                    {
                        id: '5',
                        question: 'How long should I commit?',
                        answer: 'Consistency matters. Our team will help you choose a suitable duration based on your goals and availability.',
                    },
                ]}
                subtext="Build a Consistent Yoga Practice Without Disrupting Your Life"
                primaryCtaText="Check Program Fit & Speak to a Yoga Advisor"
                secondaryCtaText="WhatsApp Us for initial guidance"
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

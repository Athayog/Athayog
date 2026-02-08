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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
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
import bacgroundImage from '/public/images/Sample.png'
import Sample4 from '/public/images/Sample (4).png'
import Image2 from '/public/images/mental-health/2.png'
import Image1 from '/public/images/mental-health/1.png'
import Image3 from '/public/images/mental-health/3.png'
import LearningAreasSection from '../LearningAreasSection'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Online Yoga Teacher Training Course for Serious Practitioners & Future Teachers"
                description="A structured, live-guided online yoga teacher training (TTC) designed for individuals who want authentic yogic education, real teaching confidence, and credible certification."
                features={['Live interactive classes', 'Structured curriculum & assessments', 'Faculty-guided learning', 'Limited cohort for depth & focus']}
                ctaButtonText="Check Eligibility & Apply"
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

            <ImageFeatureSection
                title="Is This Online Yoga Teacher Training Right for You?"
                description="This online TTC is suitable if you"
                image={Image2}
                imageAlt="Group of people practicing yoga in a peaceful studio"
                features={[
                    {
                        icon: <SchoolIcon />,
                        text: 'Want to teach yoga professionally or deepen your practice seriously',
                    },
                    {
                        icon: <LiveTvIcon />,
                        text: 'Prefer live, guided learning over self-paced recordings',
                    },
                    {
                        icon: <AccessTimeIcon />,
                        text: 'Are willing to commit time, attention, and discipline',
                    },
                    {
                        icon: <VerifiedIcon />,
                        text: 'Want a credible yoga teacher certification.',
                    },
                    {
                        icon: <LaptopMacIcon />,
                        text: 'Need the flexibility of online learning without losing depth',
                    },
                ]}
            />

            <NumberedListSection
                title="What Is an Online Yoga Teacher Training Program?"
                subtitle="An online yoga teacher training course at AthaYog Living is a live, instructor-led educational program that delivers the depth of a traditional TTC through a structured online format."
                items={[
                    {
                        id: '1',
                        text: 'Live asana practice & alignment guidance',
                    },
                    {
                        id: '2',
                        text: 'Pranayama and breath science',
                    },
                    {
                        id: '3',
                        text: 'Meditation fundamentals',
                    },
                    {
                        id: '4',
                        text: 'Yoga philosophy & ethics',
                    },
                    {
                        id: '5',
                        text: 'Applied anatomy',
                    },
                    {
                        id: '6',
                        text: 'Teaching methodology & practice teaching',
                    },
                ]}
            />
            {/* TODO: GET AI GEN IMAGES */}
            <LearningAreasSection
                title="What You Will Learn in the Online TTC"
                subtitle="Core Learning Areas:"
                layout="grid" // Horizontal cards with optional images
                learningAreas={[
                    {
                        id: '1',
                        title: 'Asana Practice & Alignment',
                        description: 'Safe, mindful practice with functional understanding',
                        image: Image2, // Add your image
                        imageAlt: 'Asana practice and alignment',
                    },
                    {
                        id: '2',
                        title: 'Pranayama & Breath Awareness',
                        description: 'Understanding breath regulation and its effects',
                        image: Image3, // Add your image
                        imageAlt: 'Pranayama breathing techniques',
                    },
                    {
                        id: '3',
                        title: 'Meditation & Inner Practices',
                        description: 'Foundational techniques for focus and clarity',
                        // Can add image or leave without
                    },
                    {
                        id: '4',
                        title: 'Yoga Philosophy & Ethics',
                        description: 'Classical concepts applied to modern life',
                        image: Image2, // Add your image
                        imageAlt: 'Yoga philosophy study',
                    },
                    {
                        id: '5',
                        title: 'Applied Anatomy',
                        description: 'Understanding the body for safe teaching (non-medical)',
                    },
                    {
                        id: '6',
                        title: 'Teaching Methodology',
                        description: 'Cueing, sequencing, observation, and correction',
                        image: Image2, // Add your image
                        imageAlt: 'Teaching methodology',
                    },
                    {
                        id: '7',
                        title: 'Practice Teaching & Feedback',
                        description: 'Guided teaching practice with faculty input',
                    },
                ]}
            />

            <FeatureSection
                title="Who Typically Joins This Online TTC"
                cards={[
                    {
                        icon: <WorkOutlineIcon />,
                        title: 'Working professionals transitioning into teaching',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Dedicated yoga practitioners seeking depth',
                    },
                    {
                        icon: <PublicIcon />,
                        title: 'International students needing location-independent learning',
                    },
                    {
                        icon: <HealthAndSafetyIcon />,
                        title: 'Wellness professionals adding yoga credentials',
                    },
                    {
                        icon: <LocationOffIcon />,
                        title: 'Individuals unable to relocate for residential TTC',
                    },
                ]}
            />
            <SplitContentSection
                title="Guided by Experienced Teachers"
                titleImage={Sample4}
                titleImageAlt="Peaceful yoga studio"
                items={[
                    { id: '1', text: 'Safety and alignment' },
                    { id: '2', text: 'Traditional principles with modern understanding' },
                    { id: '3', text: 'Ethical teaching standards' },
                    { id: '4', text: 'Clarity over complexity' },
                ]}
            />

            <ImageFeatureSection
                title="Certification & Professional Outcomes"
                // description="This online TTC is suitable if you"
                image={Image2}
                reverseLayout={true}
                imageAlt="Group of people practicing yoga in a peaceful studio"
                features={[
                    {
                        icon: <VerifiedIcon />,
                        text: 'Participants receive yoga teacher training certification',
                    },
                    {
                        icon: <SchoolIcon />,
                        text: 'Guidance is provided on teaching readiness and scope',
                    },
                    {
                        icon: <GavelIcon />,
                        text: 'Emphasis is placed on teaching responsibly and ethically',
                    },
                ]}
            />

            <IconListSection
                title="Duration, Schedule & Commitment Expectations"
                description="This online yoga teacher training requires:"
                items={[
                    {
                        id: '1',
                        text: 'Consistent live attendance',
                    },
                    {
                        id: '2',
                        text: 'Weekly study and practice time',
                    },
                    {
                        id: '3',
                        text: 'Willingness to engage and participate',
                    },
                    {
                        id: '4',
                        text: 'Commitment to learning',
                    },
                ]}
            />

            <TestimonialCTASection
                ctaButtonText=" Discuss Eligibility & Schedule Fit"
                ctaButtonHref="/contact"
                sectionTitle="What Graduates Share"
                testimonials={[
                    {
                        id: '1',
                        text: `The live format made a huge difference in my understanding.`,
                    },
                    {
                        id: '2',
                        text: 'I finally felt confident explaining and teaching postures.',
                    },
                    {
                        id: '3',
                        text: 'This felt like real teacher training',
                    },
                ]}
                finalText="Honest learning experiences. No exaggeration."
            />
            <FAQCTASection
                sectionTitle="Frequently Asked Questions"
                faqs={[
                    {
                        id: '1',
                        question: 'Is this yoga teacher training fully online?',
                        answer: 'Yes. All sessions are conducted online through live, interactive classes.',
                    },
                    {
                        id: '2',
                        question: 'Is prior yoga experience required?',
                        answer: 'Some prior practice is helpful. Suitability is assessed before enrollment.',
                    },
                    {
                        id: '3',
                        question: 'Is this program live or recorded?',
                        answer: 'The training is primarily live-guided. Recordings may be provided for review, not as a replacement for live participation.',
                    },
                    {
                        id: '4',
                        question: 'How rigorous is the program?',
                        answer: 'The program requires consistent attendance, practice, and sincere engagement.',
                    },
                    {
                        id: '5',
                        question: 'Will I be confident to teach after completion?',
                        answer: 'The curriculum is designed to progressively build teaching understanding, clarity, and confidence.',
                    },
                ]}
                subtext="Learn Yoga Deeply. Teach With Integrity. From Anywhere."
                primaryCtaText="Check Eligibility & Apply"
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

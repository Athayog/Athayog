'use client'

import { Box } from '@mui/material'
import GavelIcon from '@mui/icons-material/Gavel'
import FAQCTASection from '@/app/ld/FAQCTASection'
import EhicsImage from '/public/images/ethics.jpg'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import PublicIcon from '@mui/icons-material/Public'
import SchoolIcon from '@mui/icons-material/School'
import FeatureSection from '@/app/ld/FeatureSection'
import AnatomyImage from '/public/images/anatomy.jpg'
import MeditationImage from '/public/images/Medi.jpg'
import IconListSection from '@/app/ld/IconListSection'
import YogaProgramHero from '@/app/ld/YogaProgramHero'
import TeachingImage from '/public/images/teaching.jpg'
import FeedbackImage from '/public/images/feedback.jpg'
import VerifiedIcon from '@mui/icons-material/Verified'
import PranayamaImage from '/public/images/pranayama.png'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import WarrirorPose from '/public/images/warrior_pose.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOffIcon from '@mui/icons-material/LocationOff'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import ImageFeatureSection from '@/app/ld/ImageFeatureSection'
import NumberedListSection from '@/app/ld/NumberedListSection'
import SplitContentSection from '@/app/ld/SplitContentSection'
import heroImage from '/public/images/landing-page-hero-10.jpg'
import LearningAreasSection from '@/app/ld/LearningAreasSection'
import CertificationImage from '/public/images/certification.jpg'
import TestimonialCTASection from '@/app/ld/TestimonialCTASection'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import GirlBreathignImage from '/public/images/landing-page-hero-11.jpg'

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
                backgroundImage={heroImage}
                ctaButtonHref="/register/residential-form"
                formKey="ttc_online"
            />

            <ImageFeatureSection
                title="Is This Online Yoga Teacher Training Right for You?"
                description="This online TTC is suitable if you"
                image={GirlBreathignImage}
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

            <LearningAreasSection
                title="What You Will Learn in the Online TTC"
                subtitle="Core Learning Areas:"
                layout="grid"
                learningAreas={[
                    {
                        id: '1',
                        title: 'Asana Practice & Alignment',
                        description: 'Safe, mindful practice with functional understanding',
                        image: WarrirorPose,
                        imageAlt: 'Asana practice and alignment',
                    },
                    {
                        id: '2',
                        title: 'Pranayama & Breath Awareness',
                        description: 'Understanding breath regulation and its effects',
                        image: PranayamaImage,
                        imageAlt: 'Pranayama breathing techniques',
                    },
                    {
                        id: '3',
                        title: 'Meditation & Inner Practices',
                        description: 'Foundational techniques for focus and clarity',
                        image: MeditationImage,
                        imageAlt: 'Meditation and inner practices',
                    },
                    {
                        id: '4',
                        title: 'Yoga Philosophy & Ethics',
                        description: 'Classical concepts applied to modern life',
                        image: EhicsImage,
                        imageAlt: 'Yoga philosophy study',
                    },
                    {
                        id: '5',
                        title: 'Applied Anatomy',
                        description: 'Understanding the body for safe teaching (non-medical)',
                        image: AnatomyImage,
                        imageAlt: 'Teaching methodology',
                    },
                    {
                        id: '6',
                        title: 'Teaching Methodology',
                        description: 'Cueing, sequencing, observation, and correction',
                        image: TeachingImage,
                        imageAlt: 'Teaching methodology',
                    },
                    {
                        id: '7',
                        title: 'Practice Teaching & Feedback',
                        description: 'Guided teaching practice with faculty input',
                        image: FeedbackImage,
                        imageAlt: 'Practice teaching and feedback',
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
                titleImage={CertificationImage}
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
                image={TeachingImage}
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
                sectionTitle="What Graduates Share"
                onCtaClick={() => {
                    const phoneNumber = '+919611771434'
                    window.open(`tel:${phoneNumber}`, '_self')
                }}
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

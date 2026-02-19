'use client'

import { Box } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import TuneIcon from '@mui/icons-material/Tune'
import FAQCTASection from '@/app/ld/FAQCTASection'
import PersonIcon from '@mui/icons-material/Person'
import FeatureSection from '@/app/ld/FeatureSection'
import HealingIcon from '@mui/icons-material/Healing'
import YogaProgramHero from '@/app/ld/YogaProgramHero'
import ScheduleIcon from '@mui/icons-material/Schedule'
import Image1 from '/public/images/mental-health/1.png'
import Image2 from '/public/images/mental-health/2.png'
import BentoGridSection from '@/app/ld/BentoGridSection'
import ComparisonSection from '@/app/ld/ComparisonSection'
import PsychologyIcon from '@mui/icons-material/Psychology'
import StraightenIcon from '@mui/icons-material/Straighten'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WhoChooseImage from '/public/images/Who_Chooses.png'
import LayersClearIcon from '@mui/icons-material/LayersClear'
import ImageFeatureSection from '@/app/ld/ImageFeatureSection'
import NumberedListSection from '@/app/ld/NumberedListSection'
import SplitContentSection from '@/app/ld/SplitContentSection'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import TestimonialCTASection from '@/app/ld/TestimonialCTASection'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import OptionsShowcaseSection from '@/app/ld/OptionsShowcaseSection'
import BackgroundImageHero from '/public/images/landing-page-hero-2.jpg'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Personal Yoga Sessions in Bangalore"
                description="Experience fully personalized yoga sessions designed around your body, health goals, schedule, and limitations delivered through focused one-on-one guidance."
                features={['100% personalized programs', 'Dedicated yoga trainer', 'Studio or home-based sessions', 'LGoal-oriented & safety-focused']}
                ctaButtonText="Book a Personal Consultation"
                submitButtonText="Submit"
                submittingButtonText="Submitting..."
                formSubmitUrl="/api/submit-form"
                namePlaceholder="Name"
                emailPlaceholder="Email"
                phonePlaceholder="Phone number"
                messagePlaceholder="Your message"
                successMessage="Thank you! We will contact you soon."
                errorMessage="Something went wrong. Please try again."
                backgroundImage={BackgroundImageHero}
                ctaButtonHref="/contact-us"
                formKey="personal_training_indiranagar"
            />

            <FeatureSection
                title="Is Personal Yoga the Right Choice for You?"
                description="Personal yoga sessions are ideal if you are looking for focused guidance tailored to your body, goals, and schedule."
                cards={[
                    {
                        icon: <TrendingUpIcon />,
                        title: 'Want faster and more focused results',
                    },
                    {
                        icon: <HealingIcon />,
                        title: 'Have specific concerns like back pain, stress, weight, or stiffness',
                    },
                    {
                        icon: <PersonIcon />,
                        title: 'Prefer individual attention and privacy',
                    },
                    {
                        icon: <ScheduleIcon />,
                        title: 'Need flexible scheduling around work or family',
                    },
                    {
                        icon: <StraightenIcon />,
                        title: 'Want proper alignment, correction, and progress tracking',
                    },
                ]}
            />

            <ImageFeatureSection
                title="What Are Personal Yoga Sessions?"
                description="Personal yoga sessions are one-on-one classes where every aspect of the practice—from posture selection to pace, intensity, and progression—is customized to your needs."
                image={Image2}
                imageAlt="One-on-one yoga session with instructor guiding a student"
                features={[
                    {
                        icon: <PersonIcon />,
                        text: 'A dedicated yoga trainer focused entirely on you',
                    },
                    {
                        icon: <TrackChangesIcon />,
                        text: 'Programs designed around your personal goals and concerns',
                    },
                    {
                        icon: <VisibilityIcon />,
                        text: 'Continuous observation and real-time correction',
                    },
                    {
                        icon: <TrendingUpIcon />,
                        text: 'Safe, progressive improvement with guided tracking',
                    },
                ]}
            />

            <NumberedListSection
                title="How Your Personal Yoga Program Is Designed"
                variant="bold"
                subtitle="Each personal yoga program follows a structured, step-by-step approach to ensure safety, clarity, and steady progress."
                items={[
                    {
                        id: '1',
                        text: 'Initial consultation and assessment to understand your body, lifestyle, and current condition',
                    },
                    {
                        id: '2',
                        text: 'Goal mapping based on your needs such as health concerns, stress management, or fitness objectives',
                    },
                    {
                        id: '3',
                        text: 'Customized program design tailored to your goals, capacity, and pace',
                    },
                    {
                        id: '4',
                        text: 'Guided one-on-one sessions with continuous instruction and correction',
                    },
                    {
                        id: '5',
                        text: 'Ongoing progress review and adjustments as your practice evolves',
                    },
                ]}
            />

            <BentoGridSection
                autoLayout={false}
                cards={[
                    // ROW 1: 4 + 4 + 4 = 12
                    {
                        id: 'title',
                        type: 'title',
                        title: 'Personal Yoga for Specific Needs',
                        gridSize: { xs: 12, sm: 12, md: 4, lg: 4 },
                    },
                    {
                        id: 'pain',
                        type: 'icon',
                        icon: <HealingIcon />,
                        text: 'Back & neck pain management through safe, corrective practice',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 },
                    },
                    {
                        id: 'stress',
                        type: 'icon',
                        icon: <PsychologyIcon />,
                        text: 'Stress, anxiety, and burnout support through breath and mindful movement',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 },
                    },

                    // ROW 2: 5 + 3 + 4 = 12
                    {
                        id: 'weight',
                        type: 'text-image-side',
                        text: 'Weight management with balanced, sustainable yoga routines',
                        image: Image1,
                        imageAlt: 'Yoga practice for strength and balance',
                        imagePosition: 'left',
                        gridSize: { xs: 12, sm: 6, md: 5, lg: 5 },
                    },
                    {
                        id: 'beginners',
                        type: 'text',
                        text: 'Beginner-friendly guidance with strong foundational learning',
                        gridSize: { xs: 12, sm: 6, md: 3, lg: 3 },
                    },
                    {
                        id: 'posture',
                        type: 'icon',
                        icon: <StraightenIcon />,
                        text: 'Lifestyle and postural correction through daily habit awareness',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 },
                    },

                    // ROW 3: 12
                    {
                        id: 'progress',
                        type: 'text',
                        text: 'Programs adapt as your body and capacity change over time',
                        gridSize: { xs: 12, sm: 12, md: 12, lg: 12 },
                    },
                ]}
            />

            <OptionsShowcaseSection
                mainTitle="Studio-Based or Home-Based Personal Yoga"
                options={[
                    {
                        title: 'Studio-Based Personal Yoga',
                        items: [
                            { id: '1', text: 'Controlled, distraction-free environment' },
                            { id: '2', text: 'Full access to props and space' },
                        ],
                    },
                    {
                        title: 'Home-Based Personal Yoga',
                        items: [
                            { id: '1', text: 'Comfort and privacy of your home' },
                            { id: '2', text: 'Flexible scheduling' },
                        ],
                    },
                    {
                        title: 'Hybrid Option',
                        items: [{ id: '1', text: 'Combination of studio and home sessions' }],
                    },
                ]}
            />

            <ComparisonSection
                mainTitle="Why Personal Yoga Delivers Faster Results Than Group Classes"
                leftColumn={{
                    title: 'Group Yoga Classes',
                    items: [
                        { id: '1', text: 'Shared attention' },
                        { id: '2', text: 'Fixed pace' },
                        { id: '3', text: 'General routine' },
                        { id: '4', text: 'Limited corrections' },
                        { id: '5', text: 'Slower progress' },
                    ],
                }}
                rightColumn={{
                    title: 'Personal Yoga Sessions',
                    items: [
                        { id: '1', text: '100% trainer focus' },
                        { id: '2', text: 'Your pace' },
                        { id: '3', text: 'Customized program' },
                        { id: '4', text: 'Detailed alignment' },
                        { id: '5', text: 'Faster, safer outcomes' },
                    ],
                }}
            />
            <SplitContentSection
                title="Guided by Experienced Yoga Professionals"
                titleImage={WhoChooseImage}
                titleImageAlt="Peaceful yoga studio"
                items={[
                    { id: '1', text: 'Alignment and injury prevention' },
                    { id: '2', text: 'Respecting physical limitations' },
                    { id: '3', text: 'Progressive, sustainable practice' },
                    { id: '4', text: 'Long-term health' },
                ]}
            />

            <FeatureSection
                title="Program Investment & Commitment"
                cards={[
                    {
                        icon: <EventAvailableIcon />,
                        title: 'Session-based and monthly options available',
                    },
                    {
                        icon: <TuneIcon />,
                        title: 'Pricing depends on frequency, format, and goals',
                    },
                    {
                        icon: <LayersClearIcon />,
                        title: 'No one-size-fits-all packages',
                    },
                    {
                        icon: <ChatIcon />,
                        title: 'Consultation before commitment',
                    },
                ]}
            />

            <TestimonialCTASection
                ctaButtonText="Get a Personalized Plan & Fee Structure"
                ctaButtonHref="/contact-us"
                sectionTitle="What Clients Experience"
                testimonials={[
                    {
                        id: '1',
                        text: `The one-on-one attention made a huge difference to my posture and pain.`,
                    },
                    {
                        id: '2',
                        text: 'This is the first time yoga felt truly designed for my body.',
                    },
                    {
                        id: '3',
                        text: 'Consistency became easy when the program was built around my schedule.',
                    },
                ]}
                finalText="Real experiences. Calm progress. Sustainable change."
            />
            <FAQCTASection
                sectionTitle="Frequently Asked Questions"
                faqs={[
                    {
                        id: '1',
                        question: 'Is personal yoga suitable for beginners?',
                        answer: 'Yes. Beginners often benefit the most from one-on-one guidance and individualized attention.',
                    },
                    {
                        id: '2',
                        question: 'How often should personal yoga sessions be?',
                        answer: 'Frequency depends on your goals, availability, and physical condition. Your trainer will guide you on what’s appropriate.',
                    },
                    {
                        id: '3',
                        question: 'Is home-based yoga as effective as studio sessions?',
                        answer: 'Both can be effective when guided properly. Your trainer will advise what works best for you.',
                    },
                    {
                        id: '4',
                        question: 'Is personal yoga safe for injuries or physical limitations?',
                        answer: 'Yes. Sessions are carefully adapted based on your condition, limitations, and comfort level.',
                    },
                    {
                        id: '5',
                        question: 'How soon will I see results?',
                        answer: 'Most clients notice improvements in mobility, comfort, or mental clarity within a few weeks of consistent practice.',
                    },
                ]}
                subtext="A Yoga Program Designed Entirely Around You"
                primaryCtaText=" Book a Personal Consultation"
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

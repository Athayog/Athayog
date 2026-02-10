'use client'

import { Box } from '@mui/material'
import FAQCTASection from '@/app/ld/FAQCTASection'
import GroupsIcon from '@mui/icons-material/Groups'
import SchoolIcon from '@mui/icons-material/School'
import FeatureSection from '@/app/ld/FeatureSection'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import YogaProgramHero from '@/app/ld/YogaProgramHero'
import ScheduleIcon from '@mui/icons-material/Schedule'
import ComparisonSection from '@/app/ld/ComparisonSection'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BackgroundHeroImage from '/public/images/anatomy.jpg'
import PsychologyIcon from '@mui/icons-material/Psychology'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import ImageFeatureSection from '@/app/ld/ImageFeatureSection'
import ClassOverviewSection from '@/app/ld/ClassOverviewSection'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import TestimonialCTASection from '@/app/ld/TestimonialCTASection'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import GirlMeditattngImage from '/public/images/mental-health/2.png'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Group Yoga Classes in Indiranagar & Nearby "
                description="Join instructor-led group yoga classes in Indiranagar designed for consistency, correct practice, and long-term wellness."
                features={['Small batch group classes', 'Morning & evening timings', 'Beginner-friendly structure', 'Centrally located in Indiranagar, Bangalore']}
                ctaButtonText="Book a Free Trial Class"
                submitButtonText="Submit"
                submittingButtonText="Submitting..."
                formSubmitUrl="/api/submit-form"
                namePlaceholder="Name"
                emailPlaceholder="Email"
                phonePlaceholder="Phone number"
                messagePlaceholder="Your message"
                successMessage="Thank you! We will contact you soon."
                errorMessage="Something went wrong. Please try again."
                backgroundImage={BackgroundHeroImage}
                ctaButtonHref="/register/enquire-group-class-form"
                formKey="group_classes_indiranagar"
            />

            <FeatureSection
                title="Are These Group Yoga Classes Right for You?"
                description="These group classes are well suited for individuals looking to build a steady, guided yoga practice as part of their daily routine."
                cards={[
                    {
                        icon: <LocationOnIcon />,
                        title: 'Live or work near Indiranagar',
                    },
                    {
                        icon: <GroupsIcon />,
                        title: 'Want instructor-led group yoga sessions',
                    },
                    {
                        icon: <ScheduleIcon />,
                        title: 'Prefer fixed, routine-building timings',
                    },
                    {
                        icon: <SchoolIcon />,
                        title: 'Are a beginner or restarting yoga',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Seek flexibility, stress relief, and daily movement',
                    },
                ]}
            />

            <ClassOverviewSection
                mainTitle="Why Choose Group Yoga Classes in Indiranagar at AthaYog Living"
                highlights={['Near Indiranagar', 'Structured yoga', 'Small batches', 'Clean, focused studio']}
                sections={[
                    {
                        title: 'What to Expect in Our Group Yoga Classes',
                        subtitle: 'A Typical Class Includes:',
                        items: [
                            { id: '1', text: 'Gentle warm-up and mobility' },
                            { id: '2', text: 'Guided asana practice (based on batch level)' },
                            { id: '3', text: 'Pranayama and breath awareness' },
                            { id: '4', text: 'Relaxation or short meditation' },
                            { id: '5', text: 'Cool-down and closing guidance' },
                        ],
                    },
                    {
                        title: 'Morning & Evening Yoga Batches Available',
                        subtitle: 'We offer flexible batch timings to fit real-life schedules.',
                        items: [
                            { id: '1', text: 'Morning yoga classes for energy and focus' },
                            { id: '2', text: 'Evening yoga classes for stress relief after work' },
                            { id: '3', text: 'Fixed schedules to build consistency' },
                            { id: '4', text: 'Limited participants per batch for quality attention' },
                        ],
                        note: 'Batch availability changes — booking is recommended.',
                    },
                ]}
                ctaText="Check Today's Available Batches"
                ctaHref="/group-classes-indiranagar"
            />

            <ComparisonSection
                mainTitle="How Our Group Yoga Classes Are Different"
                leftColumn={{
                    title: 'Typical Group Yoga Classes',
                    items: [
                        { id: '1', text: 'Overcrowded rooms' },
                        { id: '2', text: 'One routine for everyone' },
                        { id: '3', text: 'Limited instructor attention' },
                    ],
                }}
                rightColumn={{
                    title: 'AthaYog Group Yoga Classes',
                    items: [
                        { id: '1', text: 'Small, focused batches' },
                        { id: '2', text: 'Instructor-led corrections' },
                        { id: '3', text: 'Structured progression' },
                        { id: '4', text: 'Calm, distraction-free environment' },
                    ],
                }}
            />

            <ImageFeatureSection
                title="Who Commonly Joins Our Indiranagar Group Classes"
                description="Our group classes are designed for everyday practitioners looking to build consistency, balance, and wellbeing."
                image={GirlMeditattngImage}
                imageAlt="Group yoga class at AthaYog Living studio in Indiranagar"
                features={[
                    {
                        icon: <WorkOutlineIcon />,
                        text: 'Working professionals managing long hours',
                    },
                    {
                        icon: <SchoolIcon />,
                        text: 'Beginners starting yoga for the first time',
                    },
                    {
                        icon: <PsychologyIcon />,
                        text: 'Individuals dealing with stress or stiffness',
                    },
                    {
                        icon: <DirectionsRunIcon />,
                        text: 'People looking for daily movement and balance',
                    },
                    {
                        icon: <FavoriteBorderIcon />,
                        text: 'Long-term wellness seekers',
                    },
                ]}
            />

            <FeatureSection
                title="Flexible Membership Options"
                description="Our group yoga programs are designed to be simple and transparent."
                cards={[
                    {
                        icon: <PlayCircleOutlineIcon />,
                        title: 'Trial class before commitment',
                    },
                    {
                        icon: <CalendarMonthIcon />,
                        title: 'Monthly and long-term plans available',
                    },
                    {
                        icon: <WbSunnyIcon />,
                        title: 'Morning and evening batch options',
                    },
                    {
                        icon: <ThumbUpOffAltIcon />,
                        title: 'No pressure to continue if it’s not the right fit',
                    },
                ]}
            />

            <TestimonialCTASection
                ctaButtonText="Get Trial & Fee Details"
                ctaButtonHref="/trial-classes"
                sectionTitle="What Our Members Say"
                testimonials={[
                    {
                        id: '1',
                        text: `The small batch size made it easy to stay consistent.`,
                    },
                    {
                        id: '2',
                        text: 'Great option for beginners who want proper guidance.”',
                    },
                    {
                        id: '3',
                        text: 'Convenient location and calm environment — easy to continue.',
                    },
                ]}
                finalText="Real local experiences. No exaggerated promises."
            />
            <FAQCTASection
                sectionTitle="Frequently Asked Questions"
                faqs={[
                    {
                        id: '1',
                        question: 'Are these group yoga classes suitable for beginners?',
                        answer: 'Yes. Beginners are guided carefully with clear instructions and proper demonstrations.',
                    },
                    {
                        id: '2',
                        question: 'Can I attend a trial class?',
                        answer: 'Yes. A free trial class is available so you can experience the sessions before joining.',
                    },
                    {
                        id: '3',
                        question: 'How big are the batches?',
                        answer: 'Batch sizes are kept limited to ensure adequate instructor attention for each participant.',
                    },
                    {
                        id: '4',
                        question: 'What if I miss a class?',
                        answer: 'Our team will guide you on how to maintain continuity wherever possible.',
                    },
                    {
                        id: '5',
                        question: "Is the studio close to Indiranagar's main areas?",
                        answer: 'Yes. The studio is centrally located in Indiranagar and is easily accessible.',
                    },
                ]}
                subtext="Start Your Yoga Practice Near Indiranagar — Without Overthinking It"
                primaryCtaText="Book a Free Trial Class"
                secondaryCtaText="Call / WhatsApp Us for batch timings and directions"
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

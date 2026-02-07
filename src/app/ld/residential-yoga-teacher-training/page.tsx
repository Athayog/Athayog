'use client'
import { Box, Typography } from '@mui/material'
import YogaProgramHero from '../YogaProgramHero'
import bacgroundImage from '/public/images/Sample.png'
import FeatureSection from '../FeatureSection'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import ImageFeatureSection from '../ImageFeatureSection'
import BentoGridSection from '../BentoGridSection'
import TestimonialCTASection from '../TestimonialCTASection'
import FAQCTASection from '../FAQCTASection'
import IconListSection from '../IconListSection'
import SplitContentSection from '../SplitContentSection'

export default function LandingPage() {
    return (
        <Box>
            <YogaProgramHero
                title="Yoga Program in Bangalore for Deep, Structured Yogic Living"
                description="An immersive residential yoga program designed for individuals seeking discipline, clarity, and inner transformation through a structured yogic lifestyle."
                features={['Full residential stay', 'Structured daily routine', 'Guided asana, pranayama & meditation', 'Limited intake for depth and focus']}
                ctaButtonText="Start Your Yoga Journey"
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
            />
            <FeatureSection
                title="Who This Residential Yoga Program Is For"
                cards={[
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Feel mentally, emotionally, or physically exhausted',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Want to step away from daily distractions completely',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Are seeking discipline, silence, and a structured routine',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Are open to guided yogic living',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        title: 'Can commit to staying residential for the program duration',
                    },
                ]}
            />
            <ImageFeatureSection
                title="Who This Residential Yoga Program Is For"
                image={bacgroundImage}
                imageAlt="Group of people practicing yoga in a peaceful studio"
                features={[
                    {
                        icon: <SelfImprovementIcon />,
                        text: 'Feel mentally, emotionally, or physically exhausted',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        text: 'Want to step away from daily distractions completely',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        text: '(PLACEHOLDER) Are seeking discipline, silence, and a structured routine',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        text: 'Are open to guided yogic living',
                    },
                    {
                        icon: <SelfImprovementIcon />,
                        text: 'Can commit to staying residential for the program duration',
                    },
                ]}
            />
            <BentoGridSection
                cards={[
                    // Row 1
                    {
                        id: 'title',
                        type: 'title',
                        title: 'Who This Residential Yoga Program Is For',
                        gridSize: { xs: 12, sm: 12, md: 4, lg: 4 },
                    },
                    {
                        id: 'card1',
                        type: 'icon',
                        icon: <SelfImprovementIcon />,
                        text: 'Can commit to staying residential for the program duration',
                        gridSize: { xs: 12, sm: 6, md: 2, lg: 2 },
                    },
                    {
                        id: 'image1',
                        type: 'image',
                        image: bacgroundImage,
                        imageAlt: 'Person practicing yoga pose',
                        gridSize: { xs: 12, sm: 6, md: 3, lg: 3 },
                    },
                    {
                        id: 'text1',
                        type: 'text',
                        text: 'Feel mentally, emotionally, or physically exhausted',
                        gridSize: { xs: 12, sm: 12, md: 3, lg: 3 },
                    },

                    // Row 2
                    {
                        id: 'icon2',
                        type: 'icon',
                        icon: <SelfImprovementIcon />,
                        text: 'Are seeking discipline, silence, and a structured routine',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 },
                    },
                    {
                        id: 'text2',
                        type: 'text',
                        text: 'Are seeking discipline, silence, and a structured routine',
                        gridSize: { xs: 12, sm: 6, md: 4, lg: 4 },
                    },
                    {
                        id: 'image2',
                        type: 'image',
                        image: bacgroundImage,
                        imageAlt: 'Yoga practice session',
                        gridSize: { xs: 12, sm: 6, md: 2, lg: 2 },
                    },
                    {
                        id: 'icon3',
                        type: 'icon',
                        icon: <SelfImprovementIcon />,
                        text: 'Can commit to staying residential for the program duration',
                        gridSize: { xs: 12, sm: 6, md: 2, lg: 2 },
                    },
                ]}
            />
            <SplitContentSection
                title="Guided, Safe, and Supportive Environment"
                items={[
                    { id: '1', text: 'Experienced instructors' },
                    { id: '2', text: 'Safe, progressive practice' },
                    { id: '3', text: 'Clear daily structure' },
                    { id: '4', text: 'Supportive residential environment' },
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
                primaryCtaHref="/contact"
                secondaryCtaText="Or WhatsApp Us for initial guidance"
                secondaryCtaHref="https://wa.me/1234567890"
            />
        </Box>
    )
}

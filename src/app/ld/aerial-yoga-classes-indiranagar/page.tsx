import React from 'react'
import { Box } from '@mui/material'
import StressIcon from '@mui/icons-material/Spa'
import InfoBarSection from '@/app/ld/InfoBarSection'
import FinalCTASection from '@/app/ld/FinalCTASection'
import SpineIcon from '@mui/icons-material/FitnessCenter'
import AerialHeroSection from '@/app/ld/AerialHeroSection'
import MuscleIcon from '@mui/icons-material/Accessibility'
import BalanceIcon from '@mui/icons-material/SelfImprovement'
import SplitContentSection from '@/app/ld/SplitContentSection'
import NumberedListSection from '@/app/ld/NumberedListSection'
import IconBenefitsSection from '@/app/ld/IconBenefitsSection'
import PricingCardsSection from '@/app/ld/PricingCardsSection'
import StudioLocationSection from '@/app/ld/StudioLocationSection'
import BackgroundHeroImage from '/public/images/landing-page-hero-4.jpg'

export default function AerialYogaPage() {
    return (
        <Box>
            {/* 1. Hero Section */}
            <AerialHeroSection
                h1="Aerial Yoga Classes in Indiranagar | Strength, Flexibility & Stress Relief"
                subheadline="Defy gravity. Build core strength. Release stress — in guided, small-batch Aerial Yoga sessions."
                trustPoints={['Small batch: Only 10 participants', 'Suitable for 15–50 yrs | Working professionals welcome', 'Beginner-friendly | Instructor-led']}
                primaryCTA={{
                    text: 'Book Your Session – ₹599',
                    href: '/book-session',
                }}
                secondaryCTA={{
                    text: 'Get Monthly Pass – ₹1,999',
                    href: '/monthly-pass',
                }}
                backgroundImage={BackgroundHeroImage}
            />

            {/* 2. Info Bar */}
            <InfoBarSection
                items={[
                    { label: 'Location', value: 'AthaYog Indiranagar' },
                    { label: 'Time', value: 'Every Thursday | 10:30 – 11:30 AM' },
                    { label: 'Session Type', value: 'Instructor-guided Aerial Yoga' },
                    { label: 'Capacity', value: '10 per batch' },
                ]}
            />

            {/* 3. Why Aerial Yoga - Using IconBenefitsSection (NEW) */}
            <IconBenefitsSection
                title="Why Choose Aerial Yoga Over Regular Yoga?"
                benefits={[
                    {
                        id: '1',
                        icon: <SpineIcon />,
                        title: 'Improves Spinal Decompression',
                        description: 'Release tension and decompress your spine naturally',
                    },
                    {
                        id: '2',
                        icon: <MuscleIcon />,
                        title: 'Builds Lean Muscle',
                        description: 'Without joint pressure or high impact',
                    },
                    {
                        id: '3',
                        icon: <BalanceIcon />,
                        title: 'Enhances Balance & Flexibility',
                        description: 'Improve coordination and body awareness',
                    },
                    {
                        id: '4',
                        icon: <StressIcon />,
                        title: 'Reduces Work Stress',
                        description: 'Combat sedentary lifestyle effects',
                    },
                ]}
            />

            {/* 4. Who Is This Class For - Using SplitContentSection (EXISTING) */}
            <SplitContentSection
                title="Designed For"
                items={[
                    { id: '1', text: 'Working professionals with sedentary routines' },
                    { id: '2', text: 'Fitness beginners looking for low-impact strength' },
                    { id: '3', text: 'Teens & adults (15–50 yrs)' },
                    { id: '4', text: 'Anyone seeking stress relief + body mobility' },
                ]}
                backgroundColor="#ffffff"
            />

            {/* 5. Pricing & Booking - Using PricingCardsSection (NEW) */}
            <PricingCardsSection
                title="Simple, Transparent Pricing"
                pricingCards={[
                    {
                        title: 'Single Session',
                        price: '₹599',
                        note: 'Excl. GST',
                        ctaText: 'Book Now',
                        ctaHref: '/book-single',
                    },
                    {
                        title: 'Monthly Pass',
                        price: '₹1,999',
                        note: 'Excl. GST',
                        ctaText: 'Get Pass',
                        ctaHref: '/monthly-pass',
                        featured: true,
                    },
                ]}
                trustNote="✔ Secure payment | ✔ Limited slots | ✔ No overcrowding"
            />

            {/* 6. What Happens in a Session - Using NumberedListSection (EXISTING) */}
            <NumberedListSection
                title="What Happens in a Session?"
                subtitle="Your 60-minute aerial yoga experience"
                items={[
                    { id: '1', text: 'Warm-up & breath awareness' },
                    { id: '2', text: 'Guided aerial poses using hammock' },
                    { id: '3', text: 'Strength & flexibility flow' },
                    { id: '4', text: 'Cool-down & relaxation' },
                ]}
                variant="minimal"
            />

            {/* 7. Visit Our Studio - Using StudioLocationSection (NEW) */}
            <StudioLocationSection
                title="Visit Our Indiranagar Studio"
                features={[
                    { id: '1', text: 'Easily accessible from metro & main roads' },
                    { id: '2', text: 'Calm, premium yoga studio ambience' },
                    { id: '3', text: 'Clean equipment & safety-checked hammocks' },
                ]}
            />

            {/* 8. Final CTA - Using FinalCTASection (NEW) */}
            <FinalCTASection
                title="Ready to Experience Aerial Yoga?"
                primaryCTA={{
                    text: 'Book Single Session – ₹599',
                    href: '/book-single',
                }}
                secondaryCTA={{
                    text: 'Choose Monthly Plan – ₹1,999',
                    href: '/monthly-pass',
                }}
            />
        </Box>
    )
}

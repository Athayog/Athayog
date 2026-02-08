// Sound Meditation Yoga - Complete Page Implementation
import React from 'react'
import { Box } from '@mui/material'

// Reuse ALL components from Aerial Yoga page
import AerialHeroSection from '@/app/ld/AerialHeroSection'
import InfoBarSection from '@/app/ld/InfoBarSection'
import IconBenefitsSection from '@/app/ld/IconBenefitsSection'
import SplitContentSection from '@/app/ld/SplitContentSection'
import PricingCardsSection from '@/app/ld/PricingCardsSection'
import NumberedListSection from '@/app/ld/NumberedListSection'
import FinalCTASection from '@/app/ld/FinalCTASection'
import bacgroundImage from '/public/images/landing-page-hero-1.jpg'
// Icons for sound meditation
import SoundWaveIcon from '@mui/icons-material/GraphicEq'
import BrainIcon from '@mui/icons-material/Psychology'
import RelaxIcon from '@mui/icons-material/SelfImprovement'
import AnxietyIcon from '@mui/icons-material/FavoriteBorder'
import SleepIcon from '@mui/icons-material/NightsStay'
import EmotionIcon from '@mui/icons-material/EmojiEmotions'
import StressIcon from '@mui/icons-material/Spa'

export default function SoundMeditationPage() {
    return (
        <Box>
            {/* 1. Hero Section - REUSED */}
            <AerialHeroSection
                h1="Sound Meditation in Indiranagar | Deep Relaxation & Mental Reset"
                subheadline="Disconnect from noise. Reconnect with calm through guided sound meditation."
                trustPoints={['Suitable for all age groups', 'No prior meditation experience required', 'Safe, guided, and deeply restorative']}
                backgroundImage={bacgroundImage} // ← Add image!
                primaryCTA={{
                    text: 'Book Session – ₹799',
                    href: '/book-sound-meditation',
                }}
                secondaryCTA={{
                    text: 'Monthly Pass – ₹2,799',
                    href: '/monthly-pass-sound',
                }}
            />

            {/* 2. Info Bar - REUSED */}
            <InfoBarSection
                items={[
                    { label: 'Location', value: 'AthaYog Indiranagar' },
                    { label: 'Time', value: 'Every Thursday | 7:30 – 8:30 PM' },
                    { label: 'Capacity', value: '20 participants' },
                    { label: 'Format', value: 'Guided Sound Meditation' },
                ]}
            />

            {/* 3A. How Sound Meditation Works - REUSED with new data */}
            <IconBenefitsSection
                title="What Is Sound Meditation?"
                subtitle="How Sound Meditation Works"
                benefits={[
                    {
                        id: '1',
                        icon: <SoundWaveIcon />,
                        title: 'Sound Frequencies & Vibrations',
                        description: 'Uses therapeutic sound waves',
                    },
                    {
                        id: '2',
                        icon: <BrainIcon />,
                        title: 'Slows Brain Waves',
                        description: 'Helps achieve meditative state',
                    },
                    {
                        id: '3',
                        icon: <RelaxIcon />,
                        title: 'Deep Relaxation Response',
                        description: 'Activates natural healing',
                    },
                ]}
                backgroundColor="#f5f5e8"
            />

            {/* 3B. Benefits You'll Feel - REUSED with new data */}
            <IconBenefitsSection
                title="Benefits You'll Feel"
                benefits={[
                    {
                        id: '1',
                        icon: <AnxietyIcon />,
                        title: 'Reduces Anxiety & Mental Fatigue',
                        description: 'Calm your racing mind',
                    },
                    {
                        id: '2',
                        icon: <SleepIcon />,
                        title: 'Improves Sleep Quality',
                        description: 'Fall asleep easier and deeper',
                    },
                    {
                        id: '3',
                        icon: <EmotionIcon />,
                        title: 'Enhances Emotional Balance',
                        description: 'Better mood regulation',
                    },
                    {
                        id: '4',
                        icon: <StressIcon />,
                        title: 'Releases Stored Stress',
                        description: 'Let go of tension',
                    },
                ]}
                backgroundColor="#ffffff"
            />

            {/* 4. Who Should Attend - REUSED */}
            <SplitContentSection
                title="Perfect For"
                items={[
                    { id: '1', text: 'Working professionals under constant stress' },
                    { id: '2', text: 'Individuals struggling with sleep or anxiety' },
                    { id: '3', text: 'Anyone seeking mental clarity & calm' },
                    { id: '4', text: 'Beginners to meditation' },
                ]}
                backgroundColor="#f5f5e8"
            />

            {/* 5. Pricing - REUSED with new prices */}
            <PricingCardsSection
                title="Session Pricing"
                pricingCards={[
                    {
                        title: 'Single Session',
                        price: '₹799',
                        note: 'Excl. GST',
                        ctaText: 'Book Now',
                        ctaHref: '/book-single-sound',
                    },
                    {
                        title: 'Monthly Pass',
                        price: '₹2,799',
                        note: 'Excl. GST',
                        ctaText: 'Get Pass',
                        ctaHref: '/monthly-pass-sound',
                        featured: true,
                    },
                ]}
                trustNote="Calm environment | Guided by experts | Limited seats"
                backgroundColor="#ffffff"
            />

            {/* 6. What to Expect - REUSED */}
            <NumberedListSection
                title="What to Expect in the Session"
                items={[
                    { id: '1', text: 'Settling & breath grounding' },
                    { id: '2', text: 'Guided sound immersion' },
                    { id: '3', text: 'Deep relaxation phase' },
                    { id: '4', text: 'Gentle return to awareness' },
                ]}
                variant="bold"
                backgroundColor="#f5f5e8"
            />

            <FinalCTASection
                title="Give Your Mind the Rest It Deserves"
                primaryCTA={{
                    text: 'Book One Session – ₹799',
                    href: '/book-single-sound',
                }}
                secondaryCTA={{
                    text: 'Choose Monthly Pass – ₹2,799',
                    href: '/monthly-pass-sound',
                }}
            />
        </Box>
    )
}

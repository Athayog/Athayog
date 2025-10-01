import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'
import { Box, Typography, Button, Container } from '@mui/material'
import Image from 'next/image'

export type EventInfoCtaProps = SliceComponentProps<Content.EventInfoCtaSlice>

const BackgroundSection = ({
	desktopUrl,
	mobileUrl,
	children
}: {
	desktopUrl?: string | null;
	mobileUrl?: string | null;
	children: React.ReactNode;
}) => (
	<>
		<Box
			sx={{
				position: 'relative',
				minHeight: { xs: '70vh', md: '100vh' },
				display: { xs: 'none', md: 'flex' },
				backgroundImage: desktopUrl ? `url(${desktopUrl})` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				alignItems: { xs: 'flex-start', md: 'flex-start' },
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '100px',
					background: 'linear-gradient(to bottom, #EAFEDF, transparent)',
					zIndex: 1
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					bottom: '-100px',
					left: 0,
					right: 0,
					height: '100px',
					background: 'linear-gradient(to bottom, #008F88 27.19%, #FFF4EA 80.91%, #FFF4EA 94.01%)',
					zIndex: 1
				},
				pt: { xs: 8, md: 0 }
			}}
		>
			{children}
		</Box>
		<Box
			sx={{
				position: 'relative',
				minHeight: { xs: '80vh', md: '100vh' },
				display: { xs: 'flex', md: 'none' },
				backgroundImage: mobileUrl ? `url(${mobileUrl})` : 'none',
				backgroundSize: 'cover, cover',
				backgroundPosition: ' left',
				backgroundRepeat: 'no-repeat, no-repeat',
				backgroundBlendMode: 'overlay, normal',
				alignItems: { xs: 'flex-start', md: 'flex-start' },
				justifyContent: 'center',
				pt: { xs: 0, md: 0 },
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '100px',
					background: 'linear-gradient(to bottom, #EAFEDF, transparent)',
					zIndex: 1
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					bottom: '-100px',
					left: 0,
					right: 0,
					height: '100px',
					background: 'linear-gradient(to bottom, #008F88 27.19%, #FFF4EA 80.91%, #FFF4EA 94.01%)',
					zIndex: 1
				},
			}}
		>
			<Box sx={{ position: 'relative', zIndex: 2 }}>
				{children}
			</Box>
		</Box>
	</>
);


const EventInfoCta: FC<EventInfoCtaProps> = ({ slice }) => {
	const { title, description, primary_cta, illustration } = slice.primary
	const ctaUrl = asLink(primary_cta)

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<BackgroundSection desktopUrl={illustration.url} mobileUrl={illustration.url}>


				{/* Content Overlay */}
				<Container maxWidth="lg" sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, zIndex: 2 }}>
					<Box sx={{
						color: 'white',
						textAlign: { xs: 'center', md: 'left' },
						maxWidth: '600px',
						py: 8
					}}>
						{/* Title */}
						<PrismicRichText
							field={title}
							components={{
								heading2: ({ children }) => (
									<Typography
										variant="h2"
										component="h1"
										sx={{
											fontWeight: 700,
											color: "#000",
											fontSize: { xs: '30px', md: '50px' },
											mb: 3,
										}}
									>
										{children}
									</Typography>
								)
							}}
						/>



						{/* Description */}
						<PrismicRichText
							field={description}
							components={{
								paragraph: ({ children }) => (
									<Typography
										variant="body1"
										sx={{
											fontSize: { xs: '22px', md: '25px' },
											lineHeight: 1.6,
											mb: 4,
											color: "#000",
										}}
									>
										{children}
									</Typography>
								)
							}}
						/>

						{/* CTA Button */}

						{ctaUrl && (
							<Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, width: '100%' }}>
								<Button
									variant="contained"
									size="medium"
									href={ctaUrl}
									sx={{
										px: '58.67px',
										py: '14.67px',
										fontSize: {
											xs: "20px",
											md: "26px"
										},
										fontWeight: 600,
										boxShadow: 0,
										borderRadius: "88.01px",
										textTransform: 'none',
										width: "283.34px",
										height: "57.34px",
										'&:hover': {
											boxShadow: 6,
											transform: 'translateY(-2px)',
										},
										transition: 'all 0.3s ease',
									}}
								>
									{primary_cta.text || 'Register Now'}
								</Button>
							</Box>
						)}
					</Box>
				</Container>
			</BackgroundSection>
		</section>
	)
}

export default EventInfoCta
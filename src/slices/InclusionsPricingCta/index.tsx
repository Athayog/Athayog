import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'
import { Box, Typography, Button, Container, Grid, Divider, List, ListItem } from '@mui/material'
import CallIcon from '/public/images/call_icon.png'
import Image from 'next/image'

export type InclusionsPricingCtaProps = SliceComponentProps<Content.InclusionsPricingCtaSlice>

const InclusionsPricingCta: FC<InclusionsPricingCtaProps> = ({ slice }) => {
	const { title, subtitle, features_left, features_right, contact_info, price_options, cta_button, contact_info_number } = slice.primary
	const ctaUrl = asLink(cta_button)

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
			style={{
				background: 'linear-gradient(90deg, #FFFFCB 0%, #EAFEDF 100%)'
			}}
		>
			<Container maxWidth="md">
				{/* Title */}
				<Box sx={{ textAlign: 'center', mb: 4 }}>
					<PrismicRichText
						field={title}
						components={{
							heading2: ({ children }) => (
								<Typography
									variant="h2"
									component="h1"
									sx={{
										fontWeight: 700,
										fontSize: { xs: '30px', md: '46px' },
										mb: 2,
										color: 'text.primary'
									}}
								>
									{children}
								</Typography>
							)
						}}
					/>

					{subtitle && (
						<Typography
							variant="h6"
							sx={{
								fontWeight: 700,
								color: '#000',
								fontSize: { xs: '16px', md: '24px' },
								background: '#fff',
								maxWidth: 'max-content',
								borderRadius: '40px',
								margin: '0 auto',
								padding: '20px 30px 20px 30px'
							}}
						>
							{subtitle}
						</Typography>
					)}
				</Box>

				{/* Features - Two Columns */}
				<Grid container spacing={6} sx={{ mb: 6 }}>
					<Grid item xs={12} md={6}>
						<List sx={{ listStyleType: 'disc', pl: 2 }}>
							{features_left?.map((item, index) => (
								<ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 2 }}>
									<Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '26px', fontWeight: '500' } }}>
										{item.feature}
									</Typography>
								</ListItem>
							))}
						</List>
					</Grid>

					<Grid item xs={12} md={6}>
						<List sx={{ listStyleType: 'disc', pl: 2 }}>
							{features_right?.map((item, index) => (
								<ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 2 }}>
									<Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '26px', fontWeight: '500' } }}>
										{item.feature}
									</Typography>
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>

				{/* Contact Info */}
				{contact_info && (
					<Box sx={{
						textAlign: 'center', mb: 4, background: '#fff',
						maxWidth: 'max-content',
						borderRadius: '40px',
						gap: '10px',
						display: 'flex',
						margin: '0 auto',
						padding: '20px 30px 20px 30px',

					}}>
						<Image src={CallIcon} alt='call icom' />
						<Typography
							variant="body1"
							sx={{
								fontSize: { xs: '1rem', md: '24px' },
								fontWeight: 500,
								color: '#000',

							}}
						>
							{contact_info}
							<span style={{ fontWeight: 'bold', marginLeft: '10px' }}>{contact_info_number}</span>
						</Typography>

					</Box>
				)}



				{/* Price Options */}
				<Box sx={{ mb: 6, background: "rgba(255, 255, 255, 0.8)", padding: 6, borderRadius: '219.5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					{price_options?.map((option, index) => (
						<Box key={index} sx={{ textAlign: 'center', mb: 3, display: 'flex', gap: '15px' }}>
							{option.label && (
								<Typography
									variant="h5"
									component="h3"
									sx={{
										fontWeight: 700,
										fontSize: { xs: '1.5rem', md: '34px' },
										color: 'text.primary'
									}}
								>
									{option.label}
								</Typography>
							)}

							{option.price && (
								<Typography
									variant="h4"
									sx={{
										fontWeight: 600,
										fontSize: { xs: '1.5rem', md: '34px' },
										color: 'primary.main'
									}}
								>
									{option.price}
								</Typography>
							)}

							{option.note && (
								<Typography
									variant="h4"
									sx={{
										fontWeight: 600,
										fontSize: { xs: '1.5rem', md: '24px' },
										color: 'primary.main'
									}}
								>
									{option.note}
								</Typography>
							)}
						</Box>
					))}
				</Box>



				{/* CTA Button */}
				{ctaUrl && (
					<Box sx={{ textAlign: 'center' }}>
						<Button
							variant="contained"
							size="large"
							href={ctaUrl}
							sx={{
								px: 4,
								py: 1.5,
								fontSize: '1.1rem',
								fontWeight: 600,
								borderRadius: 2,
								textTransform: 'none',
								boxShadow: 3,
								'&:hover': {
									boxShadow: 6,
									transform: 'translateY(-2px)'
								},
								transition: 'all 0.3s ease'
							}}
						>
							{cta_button.text || 'Register Now'}
						</Button>
					</Box>
				)}
			</Container>
		</section>
	)
}

export default InclusionsPricingCta
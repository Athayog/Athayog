import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'
import { Box, Typography, Button, Container, Grid, Divider, List, ListItem } from '@mui/material'

export type InclusionsPricingCtaProps = SliceComponentProps<Content.InclusionsPricingCtaSlice>

const InclusionsPricingCta: FC<InclusionsPricingCtaProps> = ({ slice }) => {
	const { title, subtitle, features_left, features_right, contact_info, price_options, cta_button } = slice.primary
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
								fontSize: { xs: '16px', md: '24px' }
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
								<ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 1 }}>
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
								<ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 1 }}>
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
					<Box sx={{ textAlign: 'center', mb: 4 }}>
						<Typography
							variant="body1"
							sx={{
								fontSize: { xs: '1rem', md: '1.125rem' },
								fontWeight: 500,
								color: 'text.secondary'
							}}
						>
							{contact_info}
						</Typography>
					</Box>
				)}

				{/* Divider */}
				<Divider sx={{ my: 4 }} />

				{/* Price Options */}
				<Box sx={{ mb: 6 }}>
					{price_options?.map((option, index) => (
						<Box key={index} sx={{ textAlign: 'center', mb: 3 }}>
							{option.label && (
								<Typography
									variant="h5"
									component="h3"
									sx={{
										fontWeight: 600,
										fontSize: { xs: '1.25rem', md: '1.5rem' },
										mb: 1,
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
										fontWeight: 700,
										fontSize: { xs: '1.5rem', md: '2rem' },
										mb: 1,
										color: 'primary.main'
									}}
								>
									{option.price}
								</Typography>
							)}

							{option.note && (
								<Typography
									variant="body2"
									sx={{
										fontSize: { xs: '0.875rem', md: '1rem' },
										color: 'text.secondary',
										fontStyle: 'italic'
									}}
								>
									{option.note}
								</Typography>
							)}
						</Box>
					))}
				</Box>

				{/* Divider */}
				<Divider sx={{ my: 4 }} />

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
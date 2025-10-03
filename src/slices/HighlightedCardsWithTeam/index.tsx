import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { asLink } from '@prismicio/helpers'
import { Box, Typography, Button, Container, Grid, Card, CardContent, Avatar } from '@mui/material'
import Image from 'next/image'

export type HighlightedCardsWithTeamProps = SliceComponentProps<Content.HighlightedCardsWithTeamSlice>

const HighlightedCardsWithTeam: FC<HighlightedCardsWithTeamProps> = ({ slice }) => {
	const { title, introduction, highlighted_cards, team_title, team_members } = slice.primary

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} style={{
			background: 'linear-gradient(180deg, #FFF4EA 5.61%, #FFFFFF 34.53%, rgba(255, 255, 255, 1) 79.33%)'
		}}>
			<Container maxWidth="lg" sx={{ py: 8 }}>
				{/* Main Section */}
				<Box sx={{ textAlign: 'center', mb: 8 }}>
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
										mb: 3,
										color: 'text.primary'
									}}
								>
									{children}
								</Typography>
							)
						}}
					/>

					<PrismicRichText
						field={introduction}
						components={{
							paragraph: ({ children }) => (
								<Typography
									variant="body1"
									sx={{
										fontSize: { xs: '20px', md: '24px' },
										fontWeight: '500',
										lineHeight: 1.6,
										maxWidth: '800px',
										mx: 'auto'
									}}
								>
									{children}
								</Typography>
							)
						}}
					/>
				</Box>

				{/* Highlighted Cards Grid */}
				<Grid container spacing={4} sx={{ mb: 10 }}>
					{highlighted_cards?.map((card, index) => {
						const ctaUrl = asLink(card.cta)
						return (
							<Grid item xs={12} md={6} key={index}>
								<Card sx={{
									height: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 40px 0px rgba(0, 0, 0, 0.4)', background: index === 0
										? 'linear-gradient(154.31deg, rgba(212, 220, 255, 0.4) 2.84%, rgba(255, 209, 248, 0.4) 128.27%)'
										: 'linear-gradient(157.87deg, rgba(229, 212, 255, 0.4) 29.48%, rgba(240, 255, 142, 0.4) 128.51%)'
								}}>
									{/* Card Image */}
									{card.image?.url && (
										<Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
											<Image
												src={card.image.url}
												alt=""
												fill
												style={{ objectFit: 'cover' }}
											/>
										</Box>
									)}

									<CardContent sx={{ p: { xs: 3, md: 4 } }}>
										{/* Card Title */}
										<PrismicRichText
											field={card.title}
											components={{
												heading3: ({ children }) => (
													<Typography
														variant="h4"
														component="h3"
														sx={{
															fontWeight: 700,
															fontSize: { xs: '1.5rem', md: '32px' },
															mb: 1,

														}}
													>
														{children}
													</Typography>
												)
											}}
										/>

										{/* Card Subtitle */}
										<PrismicRichText
											field={card.subtitle}
											components={{
												heading4: ({ children }) => (
													<Typography
														variant="h6"
														component="p"
														sx={{
															fontWeight: 700,
															fontSize: { xs: '1rem', md: '32px' },
															mb: 2,
														}}
													>
														{children}
													</Typography>
												)
											}}
										/>

										{/* Card Description */}
										<PrismicRichText
											field={card.description}
											components={{
												paragraph: ({ children }) => (
													<Typography
														variant="body1"
														sx={{
															fontSize: { xs: '0.9rem', md: '24px' },
															lineHeight: 1.6,
															mb: { xs: 3, md: 6 },
															color: '#000'
														}}
													>
														{children}
													</Typography>
												)
											}}
										/>

										{/* CTA Button */}
										{ctaUrl && (
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
												<Button
													variant="contained"
													size='large'
													href={ctaUrl}
													sx={{
														px: {
															xs: 1.7,    // 13.64px mobile
															md: 2.34    // 18.69px desktop (18.69/8)
														},
														py: {
															xs: 1.28,   // 10.23px mobile  
															md: 1.75    // 14.01px desktop (14.01/8)
														},
														fontSize: {
															xs: "16px",
															md: "26px"
														},
														fontWeight: 600,
														borderRadius: {
															xs: "27.29px",
															md: "37.37px"
														},
														textTransform: 'none',
														height: {
															xs: "42px",
															md: '63px'
														},
														width: { xs: '139px', md: '206px' },
														'&:hover': {
															boxShadow: 6,
															transform: 'translateY(-2px)',
														},
														transition: 'all 0.3s ease',
													}}
												>
													{card.cta.text || 'View Stay'}
												</Button></Box>

										)}
									</CardContent>
								</Card>
							</Grid>
						)
					})}
				</Grid>

				{/* Team Section */}
				<Box sx={{ textAlign: 'center', marginTop: { xs: '60px', md: "150px" } }}>
					<PrismicRichText
						field={team_title}
						components={{
							heading2: ({ children }) => (
								<Typography
									variant="h2"
									component="h2"
									sx={{
										fontWeight: 700,
										fontSize: { xs: '2rem', md: '2.5rem' },
										mb: { xs: 3, md: 6 },
										color: 'text.primary'
									}}
								>
									{children}
								</Typography>
							)
						}}
					/>

					<Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
						{team_members?.map((member, index) => (
							<Grid item xs={12} md={4} key={index}>
								<Box sx={{ textAlign: 'center', p: 3 }}>
									{/* Avatar */}
									{member.avatar?.url && (
										<Box sx={{
											width: 259, // 253 + 3px border each side
											height: 259,
											mx: 'auto',
											mb: 4,
											padding: '3px',
											background: 'linear-gradient(180deg, #6DCC88 0%, #FFFFFF 100%)',
											borderRadius: '50%',
											display: 'inline-flex'
										}}>
											<Avatar
												src={member.avatar.url}
												sx={{
													width: 253,
													height: 253
												}}
											/>
										</Box>
									)}

									{/* Name */}
									<PrismicRichText
										field={member.name}
										components={{
											heading4: ({ children }) => (
												<Typography
													variant="h5"
													component="h3"
													sx={{
														fontWeight: 700,

														mx: 'auto',
														maxWidth: '258px',
														textAlign: 'center',
														fontSize: { xs: '27px' },
														color: 'text.primary'
													}}
												>
													{children}
												</Typography>
											)
										}}
									/>

									{/* Bio */}
									<PrismicRichText
										field={member.bio}
										components={{
											paragraph: ({ children }) => (
												<Typography
													variant="body1"
													sx={{
														marginTop: '17px',
														lineHeight: 1.6,
														fontSize: { xs: '21px' },
														color: '#000'
													}}
												>
													{children}
												</Typography>
											)
										}}
									/>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</section >
	)
}

export default HighlightedCardsWithTeam
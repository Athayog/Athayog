import { FC } from 'react'
import Image from 'next/image'
import { Content } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { SliceComponentProps } from '@prismicio/react'
import { Box, Typography, Grid, Divider } from '@mui/material'

export type IconColumnContentHighlightProps = SliceComponentProps<Content.IconColumnContentHighlightSlice>

const IconColumnContentHighlight: FC<IconColumnContentHighlightProps> = ({ slice }) => {
	const { title, intro, highlighted_images, columns } = slice.primary

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<Box sx={{ py: { xs: 3, md: 5, lg: 8 }, px: 4, background: 'linear-gradient(180deg, #EAE1D9 5.61%, #FFFFFF 34.53%, #FFFFFF 79.33%)' }}>

				<Box sx={{
					flex: 1, textAlign: 'center', display: {
						xs: 'block', md: 'none',
						textAlign: 'center',
					}
				}}>
					{/* Main Title */}
					< Box sx={{ textAlign: 'center', mb: 4 }}>
						<PrismicRichText
							field={title}
							components={{
								heading2: ({ children }) => (
									<Typography
										variant="h2"
										component="h1"
										sx={{
											fontWeight: 700,
											fontSize: {
												"xs": "30px",
												"md": "46px"
											},
											mb: 3,
											color: 'text.primary'
										}}
									>
										{children}
									</Typography>
								)
							}}
						/>
					</Box>
					<PrismicRichText
						field={intro}
						components={{
							paragraph: ({ children }) => (
								<Typography
									variant="h6"
									sx={{
										fontWeight: 400,
										fontSize: {
											"xs": "18px",
											"md": "27px"
										},
										lineHeight: 1.6,
										color: 'rgba(64, 64, 64, 1)'
									}}
								>
									{children}
								</Typography>
							)
						}}
					/>
				</Box>

				{/* Intro with Images on Left & Right */}
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8, gap: { xs: 2, md: 2 } }}>
					{/* Left Image */}
					{highlighted_images?.[0]?.image?.url && (
						<Box sx={{
							flexShrink: 0,
							width: { xs: '180px', md: '340px' },
							height: { xs: '318px', md: '386px' },
							position: 'relative'
						}}>
							<Image
								src={highlighted_images[0].image.url}
								alt=""
								fill
								style={{ objectFit: 'contain' }}
							/>
						</Box>
					)}

					{/* Centered Intro Text */}
					<Box sx={{
						flex: 1, maxWidth: '700px', textAlign: 'center', display: {
							xs: 'none', md: 'block'
						}
					}}>
						{/* Main Title */}
						< Box sx={{ textAlign: 'center', mb: 4 }}>
							<PrismicRichText
								field={title}
								components={{
									heading2: ({ children }) => (
										<Typography
											variant="h2"
											component="h1"
											sx={{
												fontWeight: 700,

												fontSize: {
													xs: "20px",   // Mobile smallest
													sm: "22px",   // Small tablets  
													md: "30px",   // Tablets
													lg: "46px",   // Desktop
													xl: "46px"    // Large desktop
												},
												mb: 3,
												color: 'text.primary'
											}}
										>
											{children}
										</Typography>
									)
								}}
							/>
						</Box>
						<PrismicRichText
							field={intro}
							components={{
								paragraph: ({ children }) => (
									<Typography
										variant="h6"
										sx={{
											fontWeight: 400,
											fontSize: {
												"xs": "18px",
												"md": "27px"
											},
											lineHeight: '39px',
											color: 'rgba(64, 64, 64, 1)'
										}}
									>
										{children}
									</Typography>
								)
							}}
						/>
					</Box>

					{/* Right Image */}
					{highlighted_images?.[1]?.image?.url && (
						<Box sx={{
							flexShrink: 0,
							width: { xs: '180px', md: '319px' },
							height: { xs: '287px', md: '327px' },
							position: 'relative',

						}}>
							<Image
								src={highlighted_images[1].image.url}
								alt=""
								fill
								style={{
									objectFit: 'contain'
								}}
							/>
						</Box>
					)}
				</Box>

				{/* Columns Grid */}
				<Grid container spacing={6} px={{ xs: 0, md: 6 }}>
					{columns?.map((column, index) => (
						<Grid item xs={12} md={4} key={index}>
							<Box sx={{ textAlign: 'left' }}>
								{/* Icon */}
								{column.icon?.url && (
									<Box sx={{ mb: 3 }}>
										<img
											src={column.icon.url}
											alt=""
											style={{
												width: '80px',
												height: '80px',
												objectFit: 'contain'
											}}
										/>
									</Box>
								)}

								{/* Column Title with Divider */}
								<Box sx={{ mb: 3 }}>
									<PrismicRichText
										field={column.column_title}
										components={{
											heading3: ({ children }) => (
												<Typography
													variant="h4"
													component="h3"
													sx={{
														fontWeight: 700,
														fontSize: { xs: '25px', md: '28px' },
														mb: 2,
														color: index === 0 ? 'rgba(255, 67, 118, 1)' : index === 1 ? 'rgba(48, 103, 213, 1)' : 'rgba(76, 172, 47, 1)'
													}}
												>
													{children}
												</Typography>
											)
										}}
									/>

								</Box>

								{/* Column Description */}
								<PrismicRichText
									field={column.column_description}
									components={{
										paragraph: ({ children }) => (
											<Typography
												variant="body1"
												sx={{
													fontSize: { xs: '22px', md: '25px' },
													lineHeight: 1.6,
													color: 'rgba(64, 64, 64, 1)'
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
			</Box >
		</section >
	)
}

export default IconColumnContentHighlight
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
			<Box sx={{ py: { xs: 3, md: 5, lg: 8 }, px: 4, background: 'linear-gradient(180deg, #EAE1D9 5.61%, #FFFFFF 34.53%, #EAFEDF 79.33%)' }}>

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
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'space-between' }, mb: { xs: 2, md: 8 }, gap: { xs: 2, md: 2 } }}>
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
				<Grid container spacing={{ xs: 4, md: 6 }} px={{ xs: 0, md: 6 }} justifyContent='center'>
					{columns?.map((column, index) => (
						<Grid item xs={12} md={4} key={index} sx={{
							position: 'relative',
							'&::after': {
								content: '""',
								position: 'absolute',
								right: 0,
								top: '10%',
								bottom: '10%',
								width: '3px',
								background: 'linear-gradient(to bottom, transparent, rgba(123, 118, 119, 0.2), transparent)',
								display: { xs: 'none', md: index < columns.length - 1 ? 'block' : 'none' }
							},
							'&::before': {
								content: '""',
								position: 'absolute',
								bottom: 0,
								left: '10%',
								right: '10%',
								height: '3px',
								background: 'linear-gradient(to right, transparent, rgba(123, 118, 119, 0.2), transparent)',
								display: { xs: index < columns.length - 1 ? 'block' : 'none', md: 'none' }
							},
							pb: { xs: index < columns.length - 1 ? 6 : 0, md: 0 },
							pr: { md: index < columns.length - 1 ? 4 : 0 }
						}}>
							<Box sx={{ textAlign: 'left', maxWidth: '372px' }}>
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
				{/* What Awaits You Grid Section */}
				{slice.primary.retreate_information_title && (
					<Box sx={{ mt: { xs: 12, md: '120px' }, textAlign: 'center' }}>
						{/* Section Title */}
						<Typography
							variant="h2"
							component="h2"
							sx={{
								fontWeight: 700,
								fontSize: { xs: '30px', md: '46px' },
								mb: { xs: '30px', md: '60px' },
								color: 'text.primary'
							}}
						>
							{slice.primary.retreate_information_title}
						</Typography>

						{/* Grid Items */}
						<Box sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
							gap: { xs: 8, md: 2 },
							justifyContent: { xs: 'flex-start', md: 'center' },
							maxWidth: '1000px',
							margin: '0 auto'
						}}>
							{slice.primary.retreate_information_grid?.map((item, index) => (
								<Box key={index} sx={{ p: { xs: 0, md: 1 } }}>
									<Box sx={{
										textAlign: 'left',
										p: { xs: 0, md: 4 },
										maxWidth: '456px',
										mx: { xs: 0, md: 'auto' },
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start'
									}}>
										{/* Image */}
										{item.retreate_content_image?.url && (
											<Box sx={{
												mb: { xs: 3, md: 6 },
												width: { xs: '100%', md: '456px' },
												height: { xs: '250px', md: '312px' },
												maxWidth: '100%',
												position: 'relative',
												borderRadius: 1,
												overflow: 'hidden'
											}}>
												<Image
													src={item.retreate_content_image.url}
													alt=""
													fill
													style={{ objectFit: 'cover' }}
													blurDataURL='LEHV6nWB2yk8pyo0adR*.7kCMdnj'
												/>
											</Box>
										)}

										{/* Title */}
										{item.title && (
											<Typography
												variant="h4"
												component="h3"
												sx={{
													textAlign: 'left',
													fontWeight: 700,
													fontSize: { xs: '22px', md: '32px' },
													mb: 2,
													color: 'text.primary'
												}}
											>
												{item.title}
											</Typography>
										)}

										{/* Description */}
										{item.retreate_content_description && (
											<Typography
												variant="body1"
												sx={{
													fontWeight: 400,
													textAlign: 'left',
													fontSize: { xs: '21px', md: '26px' },
													lineHeight: 1.6,
													color: 'rgba(64, 64, 64, 1)'
												}}
											>
												{item.retreate_content_description}
											</Typography>
										)}
									</Box>
								</Box>
							))}
						</Box>
					</Box>
				)}
			</Box >
		</section >
	)
}

export default IconColumnContentHighlight
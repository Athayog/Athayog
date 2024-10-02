import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Button from '@/components/elements/button/Index'
import { Box, Typography, Grid } from '@mui/material'
import { NumberField } from '@prismicio/client'
import { KeyTextField } from '@prismicio/client'
/**
 * Props for `GroupClassPricing`.
 */
export type GroupClassPricingProps =
    SliceComponentProps<Content.GroupClassPricingSlice>

/**
 * Component for "GroupClassPricing" Slices.
 */

const PackagesBox = ({
    name,
    type,
    days,
    price,
}: {
    name: string | KeyTextField
    type: string | KeyTextField
    days: number | NumberField
    price: string | NumberField
}) => {
    return (
        <Box
            sx={{
                background: '#f5ffef',
                padding: { xs: '20px 25px', md: '30px 40px' },
                borderRadius: '12px',
                border: '1.838px solid #549610',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: '25px', md: '38px' },
                    color: '#303030',
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                {name}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: { xs: '11px', md: '20px' },
                    width: '100%',
                    color: '#606060',
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '21px', md: '32px' },
                        fontWeight: '400',
                        textAlign: 'center',
                    }}
                >
                    {type}
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: '21px', md: '32px' },
                        fontWeight: '400',
                        textAlign: 'center',
                    }}
                >
                    {days} Days
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontSize: { xs: '30px', md: '45px' },
                    color: '#303030',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginTop: { xs: '10px', md: '15px' },
                }}
            >
                {price}
            </Typography>
            <Button
                sx={{
                    background:
                        ' linear-gradient(92deg, #42740E 24.16%, #65B710 166.68%)',
                    color: '#fff',
                    alignSelf: 'flex-end',
                }}
            >
                Register
            </Button>
        </Box>
    )
}

const GroupClassPricing = ({ slice }: GroupClassPricingProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <>
                <Box
                    sx={{
                        background:
                            'linear-gradient(to bottom, #cdf7c9, #EAFEDF)',
                        height: '100%',
                        margin: 0,
                        padding: { xs: '30px 10px', md: '60px 50px' },
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: { xs: '100%', md: '1200px' },
                            margin: '0 auto',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: { xs: '24px', md: '48px' },
                                fontWeight: '700',
                                textAlign: 'center',
                                color: '#2A5200',
                                '&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            {slice.primary.title}
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '18px', md: '48px' },
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    color: '#284E01',
                                }}
                            >
                                Subscription for Indiranagar
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: { xs: '0px', md: '20px' },
                                    flexDirection: 'column',
                                }}
                            >
                                {' '}
                                <Grid
                                    container
                                    xs={12}
                                    lg={12}
                                    spacing={4}
                                    sx={{
                                        marginTop: { xs: '0px', md: '20px' },
                                    }}
                                >
                                    {slice.primary.subscriptionforindiranagar.map(
                                        (item, index) => (
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                key={index}
                                            >
                                                <PackagesBox
                                                    name={item.course_name}
                                                    type="Indiranagar"
                                                    days={item.days}
                                                    price={item.price}
                                                />
                                            </Grid>
                                        )
                                    )}
                                </Grid>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '32px',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: '32px', md: '48px' },
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    color: '#284E01',
                                }}
                            >
                                Other Categories
                            </Typography>
                            <Grid
                                container
                                xs={12}
                                lg={12}
                                spacing={4}
                                sx={{ marginTop: { xs: '0px', md: '20px' } }}
                            >
                                {slice.primary.other_courses.map(
                                    (item, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <PackagesBox
                                                name={item.course_name}
                                                type={item.detail}
                                                days={item.days}
                                                price={item.price}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                marginTop: '60px',
                                fontSize: { xs: '16px', md: '32px' },
                                '&&& p': {
                                    margin: 0,
                                },
                            }}
                        >
                            <PrismicRichText
                                field={slice.primary.terms_and_conditions}
                            />
                        </Box>
                    </Box>
                </Box>
            </>
        </section>
    )
}

export default GroupClassPricing

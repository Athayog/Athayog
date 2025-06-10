'use client'
import { FC } from 'react'
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Divider } from '@mui/material'
import { SliceComponentProps } from '@prismicio/react'
import { Content } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import CalendarIcon from '/public/images/calendar.svg'
import MapIcon from '/public/images/map-pin.svg'
import ClockIcon from '/public/images/clock.svg'
import RegisterButton from '@/components/elements/button/RegisterButton'
import { styled } from '@mui/material/styles'
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight'
import Image from 'next/image'
import { PrismicNextImage } from '@prismicio/next'

export type EventScheduleDetailsProps = SliceComponentProps<Content.EventScheduleDetailsSlice>

// Styled Components
const Section = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        padding: '10px',
    }
}))

const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch', // so children stretch to equal height
    gap: theme.spacing(4),
    marginTop: theme.spacing(4),
    flexWrap: 'nowrap', // force them to stay in one row
    maxWidth: '800px',
    margin: '0 auto', // center the row
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}))


const InfoBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

}))

const InfoTitle = styled(Typography)(() => ({
    color: '#003744',
    fontWeight: 500,
    fontFamily: 'var(--font-montserrat)',
    fontSize: '32px',
    marginLeft: '8px'
}))

const InfoText = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: '16px',
    ' p, h2': {
        margin: 0,
        color: '#003744',
        fontSize: '32px',
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: '25px',
        }
    },
}))

const DayOfWeek = styled(Typography)(() => ({
    color: '#003744',
    fontSize: '28px',
    fontWeight: '700',
}))

const TimeBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '32px',
    marginBottom: '32px',
    fontFamily: 'var(--font-montserrat)',

    'p': {
        fontFamily: 'var(--font-montserrat)',
        fontWeight: 500,
    },

}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: 'none',
    padding: '10px',
    [theme.breakpoints.down("md")]: {
        padding: '10px',
    },
    '&& p': {
        padding: 0,
        margin: 0,
        fontWeight: 700,
        fontSize: ' 28px',
        [theme.breakpoints.down("md")]: {
            fontSize: '15px',
        }

    },
}))

const RegisterActionButton = styled(RegisterButton)(({ theme }) => ({
    marginTop: '30px',
    width: 'auto',
    [theme.breakpoints.down('md')]: {
        margin: '13px  auto 0 auto',
        fontSize: '18px',
        height: '50px',
        width: '100%',

    },
}))


const EventScheduleDetails: FC<EventScheduleDetailsProps> = ({ slice }) => {
    const scheduleItems = slice.primary.schedule_items || []

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <Section>
                <InfoRow>
                    {/* Date */}

                    <Box sx={{
                        flex: { xs: '0', md: '1 1 50%' }, maxWidth: {
                            xs: '100%', md: '50%'
                        }
                    }}>
                        <InfoBox>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                    <path d="M39.9872 8.73749H10.515C8.18971 8.73749 6.30469 10.6225 6.30469 12.9478V42.42C6.30469 44.7453 8.18971 46.6303 10.515 46.6303H39.9872C42.3125 46.6303 44.1975 44.7453 44.1975 42.42V12.9478C44.1975 10.6225 42.3125 8.73749 39.9872 8.73749Z" stroke="#FF7700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M33.6758 4.5271V12.9477" stroke="#FF7700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.8398 4.5271V12.9477" stroke="#FF7700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.30469 21.3685H44.1975" stroke="#FF7700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <InfoTitle>Date</InfoTitle>
                            </Box>
                            <InfoText>
                                <PrismicRichText field={slice.primary.date} />
                                <DayOfWeek>{slice.primary.day_of_week}</DayOfWeek>
                            </InfoText>
                        </InfoBox>
                    </Box>

                    <Divider orientation="vertical" sx={{ backgroundColor: "#C47E77", width: '3px', height: '120px', display: { xs: 'none', md: 'block' } }} />

                    {/* Location */}
                    <Box sx={{
                        flex: { xs: '0', md: '1 1 50%' }, maxWidth: {
                            xs: '100%', md: '50%'
                        }
                    }}>
                        <InfoBox>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <g clip-path="url(#clip0_199_422)">
                                        <path d="M32.5668 15.5734C32.5668 26.429 18.6096 35.7338 18.6096 35.7338C18.6096 35.7338 4.65234 26.429 4.65234 15.5734C4.65234 11.8717 6.12283 8.32167 8.74032 5.70418C11.3578 3.0867 14.9079 1.61621 18.6096 1.61621C22.3112 1.61621 25.8613 3.0867 28.4788 5.70418C31.0963 8.32167 32.5668 11.8717 32.5668 15.5734Z" stroke="#FF7700" stroke-width="3.1016" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.6055 20.2258C21.175 20.2258 23.2579 18.1429 23.2579 15.5734C23.2579 13.004 21.175 10.921 18.6055 10.921C16.0361 10.921 13.9531 13.004 13.9531 15.5734C13.9531 18.1429 16.0361 20.2258 18.6055 20.2258Z" stroke="#FF7700" stroke-width="3.1016" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_199_422">
                                            <rect width="37.2192" height="37.2192" fill="white" transform="translate(0 0.0654297)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <InfoTitle>Location</InfoTitle>
                            </Box>
                            <InfoText>
                                <PrismicRichText field={slice.primary.location} />
                            </InfoText>
                        </InfoBox>
                    </Box>
                </InfoRow>

                {/* Time */}
                <TimeBox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="47" viewBox="0 0 51 47" fill="none">
                        <path d="M24.075 44.1473C35.1621 44.1473 44.15 35.16 44.15 24.0737C44.15 12.9873 35.1621 4 24.075 4C12.9879 4 4 12.9873 4 24.0737C4 35.16 12.9879 44.1473 24.075 44.1473Z" stroke="#FF7700" stroke-width="3.66434" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M23.7812 13.0294V25.0736L32.4941 29.0884" stroke="#FF7700" stroke-width="3.66434" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Typography sx={{ color: '#003744', fontSize: { xs: '26px', md: '32px' } }}>Time</Typography>
                </TimeBox>

                {/* Schedule Table */}
                <Box display="flex" justifyContent="center" mb={4}>
                    <TableContainer sx={{
                        maxWidth: '1000px',
                        padding: '20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(270deg, rgba(234, 255, 242, 0.4) 20.16%, rgba(229, 255, 226, 0.4) 75.22%)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)', // for Safari support
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}>
                        <Table>
                            <TableBody>
                                {scheduleItems.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <StyledTableCell sx={{ width: { xs: '100px', md: '250px' } }}>
                                            <Typography sx={{
                                                color: index % 2 === 0 ? 'green' : 'black',
                                                fontWeight: '700',
                                                fontSize: { xs: '15px', md: '27px' }
                                            }}>
                                                {item.time_range}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell sx={{
                                            '& p': {
                                                color: index % 2 === 0 ? 'green' : 'black',

                                            }
                                        }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: { xs: 1, md: '20px' }, alignItems: 'center' }}>
                                                <Box>
                                                    <PrismicRichText field={item.activity_description} />

                                                </Box>

                                                {Object.keys(item.image).length > 0 &&
                                                    <Box
                                                        sx={{
                                                            width: { xs: '50px', md: '100px' }, // Responsive width
                                                            height: 'auto', // Maintain aspect ratio
                                                            zIndex: 0,
                                                        }}
                                                    >
                                                        <PrismicNextImage field={item.image} style={{ width: '100%', height: '100%' }} />
                                                    </Box>
                                                }
                                            </Box>
                                        </StyledTableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* CTA Button */}
                {slice.primary.cta_register && (
                    <Box mt={4} textAlign="center">
                        <RegisterActionButton href="#register-form" sx={{ fontWeight: '700', fontSize: { xs: '17px', md: "36px" }, backgroundColor: 'rgba(255, 91, 2, 1)', boxShadow: 'none', maxWidth: { xs: '100%', md: 'max-content' }, padding: { xs: '9px 34px', md: '20px 70px' } }}>
                            {slice.primary.cta_register.text}
                        </RegisterActionButton>
                    </Box>
                )}
            </Section>
        </section>
    )
}

export default EventScheduleDetails

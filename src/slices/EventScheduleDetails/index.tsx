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

export type EventScheduleDetailsProps = SliceComponentProps<Content.EventScheduleDetailsSlice>

// Styled Components
const Section = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
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
                                <CalendarIcon style={{ fontSize: 40, color: '#003744' }} />
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
                                <MapIcon style={{ fontSize: 40, color: '#003744' }} />
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
                    <ClockIcon />
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
                                            <PrismicRichText field={item.activity_description} />
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
                        <RegisterActionButton >
                            {slice.primary.cta_register.text}
                        </RegisterActionButton>
                    </Box>
                )}
            </Section>
        </section>
    )
}

export default EventScheduleDetails

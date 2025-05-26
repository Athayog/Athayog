'use client'
import { FC } from 'react'
import { Box, Typography, Grid, Button, Card, CardContent, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'
import { SliceComponentProps } from '@prismicio/react'
import { Content } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import CalendarIcon from '/public/images/calendar.svg'
import MapIcon from '/public/images/map-pin.svg'
import ClockIcon from '/public/images/clock.svg'
import RegisterButton from '@/components/elements/button/RegisterButton'

export type EventScheduleDetailsProps = SliceComponentProps<Content.EventScheduleDetailsSlice>

const EventScheduleDetails: FC<EventScheduleDetailsProps> = ({ slice }) => {
    const scheduleItems = slice.primary.schedule_items || []

    return (
        <Box
            component="section"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            sx={{ p: 4 }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 8, mt: 4 }}>
                {/* Date Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <CalendarIcon sx={{ fontSize: 40, color: '#003744' }} />
                        <Typography sx={{ color: '#003744', fontWeight: 400, fontFamily: 'var(--font-montserrat)', fontSize: '32px', ml: 1 }}>
                            Date
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', '&& p, h2': { margin: 0, color: '#003744', fontSize: '32px', fontWeight: '700' } }}>
                        <PrismicRichText field={slice.primary.date} />
                        <Typography sx={{ color: '#003744', fontSize: '28px', fontWeight: '700' }}>
                            {slice.primary.day_of_week}
                        </Typography>
                    </Box>
                </Box>

                {/* Location Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <MapIcon sx={{ fontSize: 40, color: '#003744' }} />
                        <Typography sx={{ color: '#003744', fontWeight: 400, fontFamily: 'var(--font-montserrat)', fontSize: '32px', ml: 1 }}>
                            Location
                        </Typography>
                    </Box>


                    <Box sx={{ textAlign: 'center', '&& p, h2': { margin: 0, color: '#003744', fontSize: '32px', fontWeight: '700' } }}>
                        <PrismicRichText field={slice.primary.location} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <ClockIcon />
                <Typography sx={{ color: '#003744', fontSize: '32px' }}>
                    Time
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TableContainer sx={{ maxWidth: '1000px' }}>
                    <Table>
                        <TableBody>
                            {scheduleItems.map((item: any, index: number) => (
                                <TableRow key={index} sx={{ padding: '10px' }} >
                                    <TableCell sx={{ width: { xs: '100px', md: '250px' }, border: 'none', padding: '0px' }}>
                                        <Typography sx={{ color: index % 2 === 0 ? 'green' : 'black', fontWeight: '700', fontSize: { xs: '15px', md: '27px' } }}>
                                            {item.time_range}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', padding: { xs: '10px', md: "20px" }, '&& p': { padding: '0px', margin: '0px', fontWeight: '700', fontSize: { xs: '15px', md: '27px' }, color: index % 2 === 0 ? 'green' : 'black' } }}>
                                        <PrismicRichText field={item.activity_description} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {slice.primary.cta_register && (
                <Box mt={4} textAlign="center">
                    <RegisterButton
                        variant="contained"
                        color="warning"
                        size="large"

                    >
                        {slice.primary.cta_register.text}
                    </RegisterButton>
                </Box>
            )}
        </Box>
    )
}

export default EventScheduleDetails

import { Dot } from '@/components/elements/Dot'
import { ActionButton } from '@/components/Hero'
import { Box, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `GroupSchedule`.
 */
export type GroupScheduleProps = SliceComponentProps<Content.GroupScheduleSlice>

/**
 * Component for "GroupSchedule" Slices.
 */
const GroupSchedule = ({ slice }: GroupScheduleProps): JSX.Element => {
    const easyGreen = '#4BAB9B' // Beginner Friendly / Open to All
    const orangeIntermediate = '#F68630' // Intermediate
    const advancedRed = '#ED1E24' // Advanced
    const blueOther = '#3C69B2' // Advance Meditation / Pranayama
    const purpleColor = '#C371E2' // Aerial Yoga & Sound Meditation (Paid)

    return (
        <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div>
                <Box
                    sx={{
                        background: '#EAFEDF',
                        height: '100%',
                        padding: { xs: '30px 20px', md: '60px 50px' },
                        bgcolor: 'primaryWhite',
                    }}
                >
                    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: { xs: '24px', md: '48px' },
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    color: '#2A5200',
                                    marginBottom: '30px',
                                    '&& p': {
                                        margin: 0,
                                    },
                                }}
                            >
                                <PrismicRichText field={slice.primary.title} />
                            </Box>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    mt: 2,
                                    boxShadow: 0,
                                    borderRadius: '16px',
                                    overflow: 'auto',
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ bgcolor: 'lightgreen', position: 'sticky', left: 0, zIndex: 2 }}>Time / Day</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Monday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Tuesday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Wednesday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Thursday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Friday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Saturday</TableCell>
                                            <TableCell sx={{ bgcolor: 'lightgreen' }}>Sunday</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* ── MORNING BATCHES ── */}
                                        <TableRow>
                                            <TableCell colSpan={8} sx={{ bgcolor: '#dee9a4', fontWeight: 'bold', textAlign: 'center' }}>
                                                Morning Batches
                                            </TableCell>
                                        </TableRow>

                                        {/* 6 AM – 7 AM */}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>6 AM - 7 AM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of being
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 7 AM – 8 AM */}
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>7 AM - 8 AM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of being
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 8 AM – 9 AM */}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>8 AM - 9 AM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 9:30 AM – 10:30 AM */}
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>9:30 AM - 10:30 AM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 10:30 AM – 12:00 PM */}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>10:30 AM - 12:00 PM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>—</TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                AERIAL YOGA
                                                <br />
                                                (PAID)
                                                <Dot color={purpleColor} />
                                            </TableCell>
                                        </TableRow>

                                        {/* ── EVENING BATCHES ── */}
                                        <TableRow>
                                            <TableCell colSpan={8} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#dee9a4' }}>
                                                Evening Batches
                                            </TableCell>
                                        </TableRow>

                                        {/* 4 PM – 5 PM */}
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>4 PM - 5 PM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of Being
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Pranayama
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 5 PM – 6 PM */}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>5 PM - 6 PM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Pranayama
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 6 PM – 7 PM */}
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>6 PM - 7 PM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rhythm of Being
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Pranayama
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>

                                        {/* 7:30 PM – 8:30 PM */}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#eff3d7', position: 'sticky', left: 0, zIndex: 2 }}>7:30 PM - 8:30 PM</TableCell>
                                            {/* Monday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            {/* Tuesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yoga with Props
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            {/* Wednesday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Thursday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Trataka & Pranayama
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            {/* Friday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                AERIAL YOGA
                                                <br />
                                                (PAID)
                                                <Dot color={purpleColor} />
                                            </TableCell>
                                            {/* Saturday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance + Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            {/* Sunday */}
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box
                                sx={{
                                    mt: 2,
                                    boxShadow: 0,
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    borderRadius: '8px',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                }}
                            >
                                <Box>
                                    <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                        <ListItem
                                            sx={{
                                                display: 'list-item',
                                                bgcolor: '#a9d58b',
                                                maxWidth: 'max-content',
                                                borderRadius: '40px',
                                            }}
                                        >
                                            {slice.primary.highlighted_point}
                                        </ListItem>
                                        {slice.primary.list.map((item, index) => (
                                            <ListItem key={index} sx={{ display: 'list-item' }}>
                                                {item.list_item}
                                            </ListItem>
                                        ))}
                                    </List>
                                    <LevelStack />
                                </Box>
                                <Box>
                                    <PrismicNextLink field={slice.primary.download_button_link} target="_blank">
                                        <ActionButton variant="contained" fullWidth sx={{ marginTop: 0 }}>
                                            {slice.primary.download_buton_text}
                                        </ActionButton>
                                    </PrismicNextLink>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        </section>
    )
}

export default GroupSchedule

export const LevelStack = () => {
    const easyGreen = '#2b9d8f'
    const orangeIntermediate = '#f68630'
    const advancedRed = '#ed1e24'
    const blueOther = '#3c69b2'
    const purpleColor = '#C371E2'

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 300,
                margin: '20px 0px',
                minHeight: 120,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                userSelect: 'none',
                textTransform: 'uppercase',
            }}
        >
            <Box sx={{ flex: 1, bgcolor: easyGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Beginner Friendly / Open to all</Box>
            <Box sx={{ flex: 1, bgcolor: orangeIntermediate, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Intermediate</Box>
            <Box sx={{ flex: 1, bgcolor: advancedRed, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Advanced</Box>
            <Box sx={{ flex: 1, bgcolor: blueOther, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Advance Meditation / Pranayama</Box>
            <Box sx={{ flex: 1, bgcolor: purpleColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Aerial Yoga / Sound Meditation (PAID)</Box>
        </Box>
    )
}

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
    const easyGreen = '#2b9d8f'
    const orangeIntermediate = '#f68630'
    const advancedRed = '#ed1e24'
    const blueOther = '#3c69b2'

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
                                <Table sx={{}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                Time
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Monday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Tuesday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Wednesday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Thursday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Friday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Saturday
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    bgcolor: 'lightgreen',
                                                }}
                                            >
                                                Sunday
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                sx={{
                                                    bgcolor: '#dee9a4',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Morning Batches
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                6:00 AM - 7:00 AM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm Of Being
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Deep Space
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Trakata & Pranayama
                                                <Dot color={blueOther} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                7:00 AM - 8:00 AM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                8:00 AM - 9:00 AM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Deep Space
                                                <Dot color={blueOther} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                9:30 AM - 10:30 AM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Restorative Yoga
                                                <Dot color={blueOther} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#dee9a4',
                                                }}
                                            >
                                                Evening Batches
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                4:00 PM - 5:00 PM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={advancedRed} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={easyGreen} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Deep Space
                                                <Dot color={blueOther} />
                                            </TableCell>

                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                5:00 PM - 6:00 PM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Deep space
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                6:00 PM - 7:00 PM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Arm Balance)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Transcending Transition
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Yin Yoga
                                                <Dot color={blueOther} />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                7:30 PM - 8:30 PM
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm Of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Sound Meditation
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Advance Asana)
                                                <Dot color={easyGreen} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Uttama Sadhana (Inversions)
                                                <Dot color={advancedRed} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                MSRT & Trataka
                                                <Dot color={blueOther} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Rythm of Being
                                                <Dot color={orangeIntermediate} />
                                            </TableCell>
                                            <TableCell sx={{ position: 'relative' }}>
                                                Universal Harmony
                                                <Dot color={easyGreen} />
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
            <Box sx={{ flex: 1, bgcolor: blueOther, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sound meditation / Msrt / Yin</Box>
        </Box>
    )
}

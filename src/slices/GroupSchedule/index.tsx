import { ActionButton } from '@/components/Hero'
import {
    Box,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
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
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
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
                                                    minWidth: '150px',
                                                }}
                                            >
                                                5.00 AM - 6.00 AM
                                            </TableCell>
                                            <TableCell
                                                colSpan={7}
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Weight Loss Transformation
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
                                                6.00 AM - 7.00 AM
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>
                                                Rhythm of Being
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>Deep Space</TableCell>
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
                                                7.00 AM - 8.00 AM
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>Deep Space</TableCell>
                                            <TableCell>
                                                Rhythm Of Being
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
                                                8.00 AM - 9.00 AM
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>Deep Space</TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
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
                                                9.00 AM - 10.00 AM
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#a9d58b',
                                                }}
                                            >
                                                Restoration Yoga (Relaxing and
                                                Stretching)
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#a9d58b',
                                                }}
                                            >
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#a9d58b',
                                                }}
                                            >
                                                Asanas for Harmonal Imbalance
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#a9d58b',
                                                }}
                                            >
                                                Rhythm of Being
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#a9d58b',
                                                }}
                                            >
                                                Strength Training
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>
                                                Universal Harmony
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
                                                10.00 AM - 11.00 AM
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>Deep Space</TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
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
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#eff3d7',
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 2,
                                                }}
                                            >
                                                4.00 PM - 5.00 PM
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>Inner World</TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>Deep Space</TableCell>
                                            <TableCell>
                                                Hatha Pradipika
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
                                                5.00 PM - 6.00 PM
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
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
                                                6.00 PM - 7.00 PM
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>Deep Space</TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>Bhakti Yoga</TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>Deep Space</TableCell>
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
                                                7.00 PM - 8.00 PM
                                            </TableCell>
                                            <TableCell>
                                                Universal Harmony
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>
                                                Advance Hatha Yoga
                                            </TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                            <TableCell>
                                                Transcending Transition
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
                                                8.00 PM - 9.00 PM
                                            </TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>
                                                Hatha Pradipika
                                            </TableCell>
                                            <TableCell>
                                                Rhythm Of Being
                                            </TableCell>
                                            <TableCell>Inner World</TableCell>
                                            <TableCell>
                                                Transcending Transition
                                            </TableCell>
                                            <TableCell>Inner World</TableCell>
                                            <TableCell>Power Vinyasa</TableCell>
                                        </TableRow>
                                        {/* Add the remaining rows in similar fashion */}
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
                                        <ListItem
                                            key={index}
                                            sx={{ display: 'list-item' }}
                                        >
                                            {item.list_item}
                                        </ListItem>
                                    ))}
                                </List>
                                <Box>
                                    <PrismicNextLink
                                        field={
                                            slice.primary.download_button_link
                                        }
                                    >
                                        <ActionButton
                                            variant="contained"
                                            fullWidth
                                            sx={{ marginTop: 0 }}
                                        >
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

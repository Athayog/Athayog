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
                                        <TableRow sx={{ backgroundColor: '#fef4eb' }}>
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
                                            <TableCell>Shakthi Yoga (Arms Day)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Rythm Of Being</TableCell>
                                            <TableCell>Surya Yoga</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Uttama Sadhana (Inversions)</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
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
                                            <TableCell>Rhythm of Being</TableCell>
                                            <TableCell>Chair Yoga</TableCell>
                                            <TableCell>Uttama Sadhana (Advance Asana)</TableCell>
                                            <TableCell>Shakthi Yoga (Spine)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Shakthi Yoga (Arms Day)</TableCell>
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
                                                7.00 AM - 8.00 AM
                                            </TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Rythm of Being</TableCell>
                                            <TableCell>Uttama Sadhana (Inversions)</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Surya Yoga</TableCell>
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
                                            <TableCell>Uttama Sadhana (Arm Balance)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Surya Yoga</TableCell>
                                            <TableCell>Rythm Of Being</TableCell>
                                            <TableCell>Uttama Sadhana (Advance Asana)</TableCell>
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
                                                9.00 AM - 10.00 AM
                                            </TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Chair Yoga</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Uttama Sadhana (Advance Asana)</TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
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
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Uttama Sadhana (Inversions)</TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Rythm of Being</TableCell>
                                            <TableCell>Shakthi Yoga (Arms Day)</TableCell>
                                            <TableCell>Shakthi Yoga (Legs)</TableCell>
                                            <TableCell>Power Yoga</TableCell>
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
                                                11.00 AM - 12.00 PM
                                            </TableCell>

                                            <TableCell>Chair Yoga</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Rythm of Being</TableCell>
                                            <TableCell>Uttama Sadhana (Advance Asana)</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Surya Yoga</TableCell>
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
                                                4.00 PM - 5.00 PM
                                            </TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Shakthi Yoga (Legs)</TableCell>
                                            <TableCell>Rhythm Of Being</TableCell>
                                            <TableCell>Shakthi Yoga (Spine)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Uttama Sadhana (Advance Asana)</TableCell>
                                            <TableCell>Shakthi Yoga (Legs)</TableCell>
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
                                            <TableCell>Rhythm Of Being</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Uttama Sadhana (Inversions)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Surya Yoga</TableCell>
                                            <TableCell>Chair Yoga</TableCell>
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
                                                6.00 PM - 7.00 PM
                                            </TableCell>
                                            <TableCell>Uttama Sadhana (Advanced Asana)</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Shakthi Yoga (Arms Day)</TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Shakthi Yoga (Arms Day)</TableCell>
                                            <TableCell>Yoga Nidra</TableCell>
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
                                            <TableCell>Rhythm Of Being</TableCell>
                                            <TableCell>Power Yoga</TableCell>
                                            <TableCell>Transcending Transition</TableCell>
                                            <TableCell>Uttama Sadhana (Inversions)</TableCell>
                                            <TableCell>Rhythm Of Being</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
                                            <TableCell>Uttama Sadhana (Arms Balance)</TableCell>
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
                                                8.00 PM - 9.00 PM
                                            </TableCell>
                                            <TableCell>Trataka & MSRT</TableCell>
                                            <TableCell>Yoga Nidra</TableCell>
                                            <TableCell>Chair Yoga</TableCell>
                                            <TableCell>Trataka & MSRT</TableCell>
                                            <TableCell>Shakthi Yoga (Core)</TableCell>
                                            <TableCell>Chair Yoga</TableCell>
                                            <TableCell>Universal Harmony</TableCell>
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
                                        <ListItem key={index} sx={{ display: 'list-item' }}>
                                            {item.list_item}
                                        </ListItem>
                                    ))}
                                </List>
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

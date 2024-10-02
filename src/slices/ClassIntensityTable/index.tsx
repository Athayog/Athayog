import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating,
} from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ClassIntensityTable`.
 */
export type ClassIntensityTableProps =
    SliceComponentProps<Content.ClassIntensityTableSlice>

/**
 * Component for "ClassIntensityTable" Slices.
 */
const ClassIntensityTable = ({
    slice,
}: ClassIntensityTableProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Box
                sx={{
                    background: '#E7FAE3',
                    padding: { xs: '30px 10px', md: '60px 50px' },
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '24px', md: '48px' },
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#2A5200',
                        marginBottom: '30px',
                    }}
                >
                    {slice.primary.title}
                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '25px',
                        overflow: 'auto',
                    }}
                    elevation={0}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: '#D1E5BB' }}>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#132500',
                                        position: 'sticky',
                                        left: 0,
                                        background: '#D1E5BB',
                                        zIndex: 2,
                                        minWidth: 'max-content',
                                    }}
                                >
                                    Class Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#132500',
                                        position: 'relative',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    Body Engagement
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#132500',
                                        position: 'relative',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    Breath Engagement
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#132500',
                                        position: 'relative',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    Mind Engagement
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slice.primary.rows.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 2,
                                            fontWeight: 'bold',
                                            background: '#D5EBBC',
                                            color: '#132500',
                                            minWidth: 'max-content',
                                        }}
                                    >
                                        {item.class_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Rating
                                            value={item.body_engagement}
                                            readOnly
                                            max={5}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Rating
                                            value={item.breath_engagement}
                                            readOnly
                                            max={5}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Rating
                                            value={item.mind_engagement}
                                            readOnly
                                            max={5}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </section>
    )
}

export default ClassIntensityTable

'use client'
import ContentContainer from '@/components/_shared/ContentContainer'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import React, { useState } from 'react'
import RegisterButton from '@/components/elements/button/RegisterButton'
import theme from '@/styles/theme'
import {
    TableRow as MuiTableRow,
    TableCell as MuiTableCell,
    Table as MuiTable,
} from '@mui/material'
import {
    Box,
    Button,
    TableRow,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Typography,
    styled,
} from '@mui/material'
import { PrismicNextLink } from '@prismicio/next'

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: '20px',
    textAlign: 'end',
    fontSize: '48px',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
        fontSize: '32px',
        textAlign: 'center',
        width: '100%',
    },
}))

const StyledButton = styled(RegisterButton)(({ theme }) => ({
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
        marginTop: '20px',
        fontSize: '18px',
        height: '50px',
        width: '173px',
    },
}))

const TableCell = styled(MuiTableCell)(() => ({
    '&:first-of-type': {
        borderTopLeftRadius: '46px',
        borderBottomLeftRadius: '46px',
    },
    '&:last-of-type': {
        borderTopRightRadius: '46px',
        borderBottomRightRadius: '46px',
    },
    [theme.breakpoints.down('md')]: {
        '&:first-of-type': {
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
        },
        '&:last-of-type': {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
        },
    },
    borderBottom: 'none',
}))

const TableRowBody = styled(MuiTableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(132, 162, 118, 0.1)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'rgba(162, 205, 177, 0.25)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const groupByMonth = (workshops: any[]) => {
    return workshops.reduce(
        (acc, workshop) => {
            const { month } = workshop
            if (!acc[month]) {
                acc[month] = []
            }
            acc[month].push(workshop)
            return acc
        },
        {} as Record<string, typeof workshops>
    )
}

const Table = styled(MuiTable)(() => ({
    borderSpacing: '0 18px',
    borderCollapse: 'separate',
    maxWidth: '800px',
    margin: '0 auto',
    fontWeight: '600',
}))

/**
 * Props for `UpcomingWorkshop`.
 */
export type UpcomingWorkshopProps =
    SliceComponentProps<Content.UpcomingWorkshopSlice>

/**
 * Component for "UpcomingWorkshop" Slices.
 */
const UpcomingWorkshop = ({ slice }: UpcomingWorkshopProps): JSX.Element => {
    const groupedData = groupByMonth(slice.primary.row)
    const [selectedMonth, setSelectedMonth] = useState<string>(
        slice.primary.row?.[0]?.month ?? ''
    )
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <ContentContainer>
                {' '}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Title variant="h2">{slice.primary.title}</Title>
                    <TableContainer
                        component={Paper}
                        sx={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ color: '#4E4E4E' }}>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Topic</TableCell>
                                    <TableCell>Teacher</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupedData[selectedMonth]?.map(
                                    (
                                        row: {
                                            date_time: string | number | Date
                                            topic:
                                                | string
                                                | number
                                                | bigint
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | Promise<React.AwaitedReactNode>
                                                | null
                                                | undefined
                                            teacher:
                                                | string
                                                | number
                                                | bigint
                                                | boolean
                                                | React.ReactElement<
                                                      any,
                                                      | string
                                                      | React.JSXElementConstructor<any>
                                                  >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | Promise<React.AwaitedReactNode>
                                                | null
                                                | undefined
                                        },
                                        index: React.Key | null | undefined
                                    ) => (
                                        <TableRowBody key={index}>
                                            <TableCell>
                                                {new Date(
                                                    row.date_time
                                                ).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.date_time
                                                ).toLocaleTimeString('en-IN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </TableCell>
                                            <TableCell>{row.topic}</TableCell>
                                            <TableCell>{row.teacher}</TableCell>
                                        </TableRowBody>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        sx={{
                            marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            backgroundColor: '#f0fee4',
                            borderRadius: '44px',
                            maxWidth: 'max-content',
                            margin: '0 auto',
                            padding: '10px',
                            border: '1px solid rgba(0, 0, 0, 0.20)',
                        }}
                    >
                        {Object.keys(groupedData).map((month) => (
                            <Button
                                key={month}
                                variant={
                                    selectedMonth === month
                                        ? 'contained'
                                        : 'outlined'
                                }
                                onClick={() => setSelectedMonth(month)}
                            >
                                {month}
                            </Button>
                        ))}
                    </Box>
                    <PrismicNextLink field={slice.primary.button_link}>
                        <StyledButton>{slice.primary.button_text}</StyledButton>
                    </PrismicNextLink>
                </Box>{' '}
            </ContentContainer>
        </section>
    )
}

export default UpcomingWorkshop

'use client'
import useAuthStore from '@/store/useAuthStore'
import { Box, Typography, Avatar, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import withAuth from '@/lib/withAuth'

const Account = () => {
    const { user, loading, handleLogout } = useAuthStore()

    if (loading && !user) return <CircularProgress />
    if (!user) return <Typography>Error loading user Details</Typography>
    return (
        <Box sx={{ backgroundColor: '#e9fdde' }}>
            <Box sx={{ maxWidth: '1400px', margin: ' 0 auto' }}>
                <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px' }}>
                    <Avatar src={user.photoURL || ''} alt={user.displayName || 'User'} sx={{ width: 100, height: 100 }} />
                    <Typography variant="h5" sx={{ marginTop: '1rem' }}>
                        {user.displayName || 'Anonymous User'}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Email: {user.email}
                    </Typography>
                    {user.phoneNumber && (
                        <Typography variant="body1" color="textSecondary">
                            Phone: {user.phoneNumber}
                        </Typography>
                    )}

                    <Box sx={{ marginTop: '2rem', width: '100%' }}>
                        <Typography variant="h6">User Details</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Detail</TableCell>
                                        <TableCell align="right">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Display Name</TableCell>
                                        <TableCell align="right">{user.displayName || 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                    </TableRow>
                                    {user.phoneNumber && (
                                        <TableRow>
                                            <TableCell>Phone</TableCell>
                                            <TableCell align="right">{user.phoneNumber}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ marginTop: '2rem', width: '100%' }}>
                        <Typography variant="h6">Last Purchases</Typography>
                        {/* Replace this with actual purchase data */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Purchase ID</TableCell>
                                        <TableCell align="right">Item</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Sample data, replace with actual purchase data */}
                                    {[
                                        { id: '001', item: 'Yoga Mat', date: '2024-10-01', amount: '$25.00' },
                                        { id: '002', item: 'Yoga Block', date: '2024-09-20', amount: '$15.00' },
                                        { id: '003', item: 'Yoga Class', date: '2024-09-15', amount: '$50.00' },
                                    ].map((purchase) => (
                                        <TableRow key={purchase.id}>
                                            <TableCell>{purchase.id}</TableCell>
                                            <TableCell align="right">{purchase.item}</TableCell>
                                            <TableCell align="right">{purchase.date}</TableCell>
                                            <TableCell align="right">{purchase.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ marginTop: '2rem' }}>
                        <Button variant="contained" color="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default withAuth(Account)

'use client'
import withAuth from '@/lib/withAuth'
import { useEffect, useState } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { Box, Typography, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material'

const Account = () => {
    const { user, handleLogout } = useAuthStore()
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        const fetchCourses = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/courses?userId=${user.uid}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch courses')
                }
                const data = await response.json()
                setCourses(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [user])

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5">Please Wait...</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ backgroundColor: '#e9fdde' }}>
            <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
                <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '120px' }}>
                    {/* User Avatar */}
                    {!user ? <Skeleton variant="circular" width={100} height={100} /> : <Avatar src={user.photoURL || ''} alt={user.displayName || 'User'} sx={{ width: 100, height: 100 }} />}

                    {/* User Name */}
                    <Typography variant="h5" sx={{ marginTop: '1rem' }}>
                        {loading ? <Skeleton width="60%" /> : user.displayName || 'Anonymous User'}
                    </Typography>

                    {/* User Email */}
                    <Typography variant="body1" color="textSecondary">
                        {loading ? <Skeleton width="40%" /> : `Email: ${user?.email}`}
                    </Typography>

                    {/* User Phone */}
                    {user?.phoneNumber && (
                        <Typography variant="body1" color="textSecondary">
                            {loading ? <Skeleton width="40%" /> : `Phone: ${user.phoneNumber}`}
                        </Typography>
                    )}

                    {/* User Details Table */}
                    <UserDetailsTable user={user} loading={loading} />

                    {/* Courses Table */}
                    <CoursesTable loading={loading} courses={courses} />

                    {/* Logout Button */}
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

const UserDetailsTable = ({ user, loading }: { user: any; loading: boolean }) => (
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
                    {loading ? (
                        <>
                            <TableRow>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                            {user?.phoneNumber && (
                                <TableRow>
                                    <TableCell>
                                        <Skeleton />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton />
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
)

const CoursesTable = ({ loading, courses }: { loading: boolean; courses: any[] }) => (
    <Box sx={{ marginTop: '2rem', width: '100%' }}>
        <Typography variant="h6">Last Purchases</Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Days</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Payment Status</TableCell>
                        <TableCell align="right">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        [...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : courses.length > 0 ? (
                        courses.map((course) => (
                            <TableRow key={course.userfid}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell align="right">{course.type}</TableCell>
                                <TableCell align="right">{course.days}</TableCell>
                                <TableCell align="right">{course.price}</TableCell>
                                <TableCell align="right">{course.paymentStatus}</TableCell>
                                <TableCell align="right">{new Date(course.createdAt._seconds * 1000).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No courses found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
)

export default withAuth(Account)

import CareerForm from '@/components/forms/CareerForm'
import WeightLossForm from '@/components/forms/WeightLossForm'
import { Box, Typography } from '@mui/material'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

export type FormsProps = SliceComponentProps<Content.WeightLossFormSlice>

const Forms = ({ slice }: FormsProps): JSX.Element => {
    return (
        <Box sx={{ backgroundColor: '#EAFEDF', padding: '10px' }}>
            <Box
                maxWidth="1200px"
                margin="0 auto"
                marginTop={{ xs: '100px', md: '100px' }}
                sx={{
                    '& .MuiTextField-root': { backgroundColor: '#fff', borderRadius: '8px' },
                    '& .MuiFormHelperText-root': {
                        backgroundColor: '#EAFEDF',
                        margin: 0,
                        paddingTop: '8px',
                        paddingLeft: '5px',
                    },
                }}
            >
                <Typography sx={{ fontSize: { xs: '32px', md: '48px' }, fontWeight: '700', textAlign: 'center', color: '#2A5200', marginBottom: '38px' }}>{slice.primary.title}</Typography>

                {slice.variation === 'default' && <WeightLossForm />}
                {slice.variation === 'careerForm' && <CareerForm />}
            </Box>
        </Box>
    )
}

export default Forms

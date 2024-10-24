import React from 'react'
import { Box } from '@mui/material'
import { backgroundColorExtract } from '@/utils/color'
import { ColorField } from '@prismicio/client'

type Props = {
    background_color: { color: ColorField }[]
    children: React.ReactNode
}

const BackgroundColorLayout: React.FC<Props> = ({ background_color, children }) => {
    const backgroundGradient = backgroundColorExtract(background_color.map((item: { color: any }) => item.color))

    return (
        <Box
            sx={{
                background: backgroundGradient,
                height: '100%',
                padding: { xs: '30px 20px', md: '60px 50px' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default BackgroundColorLayout

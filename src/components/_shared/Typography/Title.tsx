import { SxProps, Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
    children: React.ReactNode;
    sx?: SxProps;
}

const Title: React.FC<TitleProps> = ({ children, sx }) => {
    return (
        <Typography
            sx={{
                fontSize: { xs: '24px', md: '48px' },
                fontWeight: '700',
                textAlign: 'center',
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default Title;

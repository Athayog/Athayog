import React from 'react';
import { SxProps, Typography } from '@mui/material';

interface SubTitleProps {
    children: React.ReactNode;
    sx?: SxProps;
}

const SubTitle: React.FC<SubTitleProps> = ({ children, sx }) => {
    return (
        <Typography
            sx={{
                fontSize: { xs: '18px', md: '24px' },
                textAlign: 'center',
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default SubTitle;

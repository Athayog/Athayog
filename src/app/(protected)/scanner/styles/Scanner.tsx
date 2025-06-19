import { Box, Paper, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    backgroundColor: '#e9fdde',
    display: 'flex',
    // minHeight: '100vh',
    // paddingTop: '8rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'var(--font-inter)'
}));

export const PaperBox = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: '0px 0px',
    height: '100%',
    boxShadow: 'none'
    // borderRadius: 10,
}));

export const ScannerBox = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    border: '2px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    aspectRatio: '1 / 1',
}));
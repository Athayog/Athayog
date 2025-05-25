import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

interface TicketDisplayProps {
    submittedData: {
        ticketID: string;
        name: string;
        email: string;
        phone: string;
        age: string | number;
        gender: string;
        tShirtSize: string;
    };
    qrData: string;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({ submittedData, qrData }) => {
    const ticketRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!ticketRef.current) return;

        const canvas = await html2canvas(ticketRef.current);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`ATH-Ticket-${submittedData.ticketID}.pdf`);
    };

    const dataRows = [
        ['Ticket ID', submittedData.ticketID],
        ['Name', submittedData.name],
        ['Email', submittedData.email],
        ['Phone', submittedData.phone],
        ['Age', submittedData.age],
        ['Gender', submittedData.gender],
        ['T-Shirt Size', submittedData.tShirtSize],
    ];

    return (
        <Box>
            <Box
                ref={ticketRef}
                sx={{

                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 600,
                    margin: '0 auto',
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    🎟️ Yoga Aarambha 2025
                </Typography>

                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableBody>
                            {dataRows.map(([label, value], index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontWeight: 600, width: '40%' }}>{label}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Scan QR Code at Entry
                    </Typography>
                    <QRCodeSVG value={qrData || ''} size={128} />
                </Box>
            </Box>

            <Button
                onClick={handleDownloadPDF}
                variant="contained"
                sx={{ mt: 3, display: 'block', mx: 'auto' }}
            >
                DOWNLOAD TICKET PDF
            </Button>
        </Box>
    );
};

export default TicketDisplay;

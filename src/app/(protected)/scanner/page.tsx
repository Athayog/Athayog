import { Metadata } from 'next';
import ScannerPage from './scanner';

export const metadata: Metadata = {
    title: 'Scanner | Athayog',
    description: 'Scan Event Tickets',
}

export default function Page() {
    return <ScannerPage />
}

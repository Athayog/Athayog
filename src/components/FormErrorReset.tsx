'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useFormStore from '@/store/useFormStore';

const ResetError = () => {
    const pathname = usePathname();

    useEffect(() => {
        useFormStore.setState({ error: null, success: false });
    }, [pathname]);

    return null;
};

export default ResetError;

import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
interface FormState {
    loading: boolean;
    error: string | null;
    success: boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: boolean) => void;
    submitForm: (formData: unknown, collectionName: string, apiUrl?: string) => Promise<void>;
}

const useFormStore = create<FormState>((set) => ({
    loading: false,
    error: null,
    success: false,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),

    submitForm: async (formData, collectionName, apiUrl) => {
        set({ loading: true, error: null, success: false });
        try {
            await addDoc(collection(db, collectionName), formData);

            if (apiUrl) {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    await addDoc(collection(db, 'formErrors'), {
                        formData,
                        error: 'Failed to submit form to API',
                        timestamp: new Date(),
                    });
                }
            }
            set({ success: true });
        } catch (error) {
            set({ error: 'Failed to submit form. Please try again later.' });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useFormStore;

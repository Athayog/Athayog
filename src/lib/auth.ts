// lib/auth.ts
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // You can access the user info here
        const user = result.user;
        return user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

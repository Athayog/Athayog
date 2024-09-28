// store/useAuthStore.ts
import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signInWithGoogle } from '@/lib/auth';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    initializeAuth: () => void;
    handleSignIn: () => Promise<void>;
    handleLogout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    error: null,
    setUser: (user) => set({ user, loading: false }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // Initialize authentication listener
    initializeAuth: () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            set({ user, loading: false });
        });
        return unsubscribe; // Now it returns the unsubscribe function
    },

    // Handle Google sign-in logic
    handleSignIn: async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            set({ error: 'Failed to sign in' });
        }
    },

    handleLogout: async () => {
        try {
            await auth.signOut();
            set({ user: null });
        } catch (err) {
            set({ error: 'Failed to log out' });
        }
    },
}));

export default useAuthStore;

import { create } from 'zustand'
import { db } from '@/lib/firebase'
import useAuthStore from '@/store/useAuthStore'
import { collection, addDoc } from 'firebase/firestore'

interface PurchaseState {
    purchases: Array<{ id: string; item: string; amount: number; date: string }>
    loading: boolean
    error: string | null
    addPurchase: (item: string, amount: number) => Promise<string | undefined>
    resetError: () => void
}

const usePurchaseStore = create<PurchaseState>((set) => ({
    purchases: [],
    loading: false,
    error: null,

    // Function to add a purchase
    addPurchase: async (item, amount) => {
        const { user } = useAuthStore.getState() // Get user from auth store
        if (!user) {
            console.error('User is not authenticated')
            return
        }

        set({ loading: true, error: null }) // Set loading state

        try {
            // Define the path for the user's purchases subcollection
            const userPurchasesRef = collection(db, `users/${user.uid}/purchases`)
            
            // Add purchase to user's subcollection in Firestore
            const purchaseRef = await addDoc(userPurchasesRef, {
                item,
                amount,
                date: new Date().toISOString(),
            })

            // Update state with the new purchase
            set((state) => ({
                purchases: [...state.purchases, { id: purchaseRef.id, item, amount, date: new Date().toISOString() }],
            }))

            return purchaseRef.id // Return the ID of the newly created purchase
        } catch (error) {
            console.error('Error adding purchase:', error)
            set({ error: (error as Error).message }) // Set error message
        } finally {
            set({ loading: false }) // Reset loading state
        }
    },

    // Reset error message
    resetError: () => set({ error: null }),
}))

export default usePurchaseStore

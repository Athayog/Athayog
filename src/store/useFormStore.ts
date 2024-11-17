import { create } from 'zustand'
import { db, storage } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
interface FormState {
    loading: boolean
    error: string | null
    success: boolean
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setSuccess: (success: boolean) => void
    submitForm: (formData: { [key: string]: any }, collectionName: string, apiUrl?: string, file?: File, fileCollection?: string) => Promise<void>
}

const useFormStore = create<FormState>((set) => ({
    loading: false,
    error: null,
    success: false,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),

    submitForm: async (formData: { [key: string]: any }, collectionName, apiUrl, file, fileCollection) => {
        set({ loading: true, error: null, success: false })
        try {
            if (file) {
                // Create a reference to the file in Firebase Storage
                const storageRef = ref(storage, `${fileCollection ? fileCollection + '/' : ''}${file.name}`)

                // Upload the file to Firebase Storage
                await uploadBytes(storageRef, file)

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(storageRef)

                // Add the download URL to the formData
                formData.fileUrl = downloadURL // Store the file reference in formData
            }
            formData.createdAt = new Date().toISOString()
            await addDoc(collection(db, collectionName), formData)
            set({ success: true })

            // Handle API call in the background without blocking UI
            if (apiUrl) {
                ;(async () => {
                    try {
                        // formData['access_key'] = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
                        // const response = await fetch('https://api.web3forms.com/submit', {
                        //     method: 'POST',
                        //     headers: { 'Content-Type': 'application/json' },
                        //     body: JSON.stringify(formData),
                        // })
                        // console.log(response)
                        // if (!response.ok) {
                        //     await addDoc(collection(db, 'formErrors'), {
                        //         formData,
                        //         error: 'Failed to submit form to API',
                        //         timestamp: new Date(),
                        //     })
                        // }
                    } catch (error) {
                        await addDoc(collection(db, 'formErrors'), {
                            formData,
                            error: 'API call failed',
                            timestamp: new Date(),
                        })
                    }
                })()
            }
        } catch (error) {
            set({ error: 'Failed to submit form. Please try again later.' })
            throw error
        } finally {
            set({ loading: false })
        }
    },
}))

export default useFormStore

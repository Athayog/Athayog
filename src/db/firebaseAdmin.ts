import 'server-only'
import admin from 'firebase-admin'

interface FirebaseAdminAppParams {
    projectId: string
    clientEmail: string
    storageBucket: string
    privateKey: string
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, '\n')
}

let initialized = false // Flag to check initialization

// Global variable to store Firestore instance
let firestore: admin.firestore.Firestore

// Function to create Firebase Admin App
function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatPrivateKey(params.privateKey)

    if (admin.apps.length === 0) {
        // Only initialize if no apps are initialized
        const cert = admin.credential.cert({
            projectId: params.projectId,
            clientEmail: params.clientEmail,
            privateKey,
        })

        admin.initializeApp({
            credential: cert,
            storageBucket: params.storageBucket,
        })

        firestore = admin.firestore() // Initialize Firestore here
        // console.log('Firebase Admin initialized successfully.')
    } else {
        // console.log('Firebase Admin app already initialized. Using existing instance.')
        firestore = admin.firestore() // Use existing Firestore instance
    }
}

// Init function to be called in API routes
export async function initAdmin() {
    if (!initialized) {
        const params: FirebaseAdminAppParams = {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
            privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        }

        createFirebaseAdminApp(params) // Initialize app
        initialized = true // Mark as initialized
    }

    return {
        firestore, // Return the initialized Firestore instance
        fieldValue: admin.firestore.FieldValue,
    }
}

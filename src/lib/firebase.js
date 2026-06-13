import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics (only if supported)
let analytics = null
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app)
    console.debug('[Firebase] Analytics initialized')
  } else {
    console.debug('[Firebase] Analytics not supported in this environment')
  }
}).catch(error => {
  console.debug('[Firebase] Analytics initialization failed:', error)
})

// NOTE: Birth plans are intentionally NOT persisted to the cloud.
// Per the IRB protocol, no birth plan data (PHI) is stored on our servers and
// there is no PIN-based retrieval. Patients save their plan directly to their
// own device (PDF) if they choose. See src/pages/Review.jsx.

export { analytics, app }

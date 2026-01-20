import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore'

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Collection reference
const BIRTH_PLANS_COLLECTION = 'birth_plans'

// Generate a unique 6-character alphanumeric PIN
export function generatePIN() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed ambiguous characters
  let pin = ''
  for (let i = 0; i < 6; i++) {
    pin += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pin
}

// Helper to add timeout to async operations
function withTimeout(promise, timeoutMs = 10000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out. Please check your internet connection.')), timeoutMs)
    )
  ])
}

// Save birth plan to Firestore
export async function saveBirthPlan(pin, responses) {
  try {
    const docRef = doc(db, BIRTH_PLANS_COLLECTION, pin)
    await withTimeout(
      setDoc(docRef, {
        pin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responses
      }, { merge: true }),
      15000 // 15 second timeout
    )
    return { success: true, pin }
  } catch (error) {
    console.error('Error saving birth plan:', error)
    return { success: false, error: error.message || 'Failed to save. Please try again.' }
  }
}

// Load birth plan by PIN
export async function loadBirthPlan(pin) {
  try {
    const docRef = doc(db, BIRTH_PLANS_COLLECTION, pin.toUpperCase())
    const docSnap = await withTimeout(getDoc(docRef), 10000)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: 'Birth plan not found' }
    }
  } catch (error) {
    console.error('Error loading birth plan:', error)
    return { success: false, error: error.message || 'Failed to load. Please try again.' }
  }
}

// Check if PIN already exists
export async function checkPINExists(pin) {
  try {
    const docRef = doc(db, BIRTH_PLANS_COLLECTION, pin)
    const docSnap = await withTimeout(getDoc(docRef), 5000)
    return docSnap.exists()
  } catch (error) {
    console.error('Error checking PIN:', error)
    return false
  }
}

// Generate a unique PIN (check for collisions)
export async function generateUniquePIN() {
  let pin = generatePIN()
  let exists = await checkPINExists(pin)
  let attempts = 0

  while (exists && attempts < 10) {
    pin = generatePIN()
    exists = await checkPINExists(pin)
    attempts++
  }

  return pin
}

export { db }

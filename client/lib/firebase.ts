import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, type Analytics } from "firebase/analytics";

/**
 * Checks if real Firebase credentials are configured in the environment.
 */
export const isFirebaseConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return Boolean(
    apiKey &&
    apiKey !== "your_firebase_api_key_here" &&
    !apiKey.startsWith("your_") &&
    projectId &&
    projectId !== "your_project_id_here" &&
    !projectId.startsWith("your_")
  );
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App safely (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics requires a valid measurementId and real configuration
let analytics: Analytics | null = null;
try {
  if (
    isFirebaseConfigured() &&
    firebaseConfig.measurementId &&
    firebaseConfig.measurementId !== "G-XXXXXXXXXX"
  ) {
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn("Firebase Analytics failed to initialise:", e);
}
export { analytics };

// Google Auth Provider setup
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Translates Firebase Auth error codes into human-friendly, actionable descriptions.
 */
export const getFriendlyFirebaseErrorMessage = (error: any): string => {
  if (!error) return "An unknown authentication error occurred.";
  const code = error.code || "";
  
  switch (code) {
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid":
      return "Firebase API key is invalid. Please update your credentials in the .env file.";
    case "auth/popup-closed-by-user":
      return "Sign in cancelled: Google popup window was closed.";
    case "auth/popup-blocked":
      return "Google sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/cancelled-popup-request":
      return "A sign-in request is already in progress.";
    case "auth/unauthorized-domain":
      return "This domain (e.g. localhost) is not authorized in your Firebase Console. Add it in Firebase Console > Authentication > Settings > Authorized domains.";
    case "auth/operation-not-allowed":
      return "Google Sign-in is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please sign in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters long.";
    case "auth/network-request-failed":
      return "Network communication error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Access has been temporarily restricted. Please try again later.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
};

export default app;

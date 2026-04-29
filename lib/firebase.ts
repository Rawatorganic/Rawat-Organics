import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVcqKcJ7EBiCBtsTkiNIYaH-35ESGVz6k",
  authDomain: "rawat-eb0c1.firebaseapp.com",
  projectId: "rawat-eb0c1",
  storageBucket: "rawat-eb0c1.firebasestorage.app",
  messagingSenderId: "1020924039310",
  appId: "1:1020924039310:web:dc6bb2247a922a547739df",
  measurementId: "G-NBX790K74L"
};

// Initialize Firebase only if it hasn't been initialized already
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics conditionally (only on the client side)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT4XTxL2IDVcnh9zQ-Dt_kF4Rsq6cyQxc",
  authDomain: "login-c8199.firebaseapp.com",
  projectId: "login-c8199",
  storageBucket: "login-c8199.firebasestorage.app",
  messagingSenderId: "759291321398",
  appId: "1:759291321398:web:a7dca175d0251430438c97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

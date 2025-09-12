// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_PROJECTID,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Class-based persistence adapter
// class ReactNativePersistence implements Persistence {
//   type: "LOCAL" = "LOCAL";
//   async _isAvailable(): Promise<boolean> {
//     return true;
//   }
//   async _set(key: string, value: string): Promise<void> {
//     await AsyncStorage.setItem(key, value);
//   }
//   async _get(key: string): Promise<string | null> {
//     return AsyncStorage.getItem(key);
//   }
//   async _remove(key: string): Promise<void> {
//     await AsyncStorage.removeItem(key);
//   }
// }

export const auth = getAuth(app);

// Apply persistence
// setPersistence(auth, new ReactNativePersistence()).catch((err) => {
//   console.error("Failed to set persistence:", err);
// });

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");

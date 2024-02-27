import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAy6HBoAdUB0KSn5EQhid1auVIWaR1ydgE",
  authDomain: "opd-system-171f0.firebaseapp.com",
  projectId: "opd-system-171f0",
  storageBucket: "opd-system-171f0.appspot.com",
  messagingSenderId: "643806281402",
  appId: "1:643806281402:web:7214c1df0b4e7ef4b54c83",
  measurementId: "G-C98JF7QQNY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
export default app;

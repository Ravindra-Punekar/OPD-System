import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyAy6HBoAdUB0KSn5EQhid1auVIWaR1ydgE",
//   authDomain: "opd-system-171f0.firebaseapp.com",
//   projectId: "opd-system-171f0",
//   storageBucket: "opd-system-171f0.appspot.com",
//   messagingSenderId: "643806281402",
//   appId: "1:643806281402:web:7214c1df0b4e7ef4b54c83",
//   measurementId: "G-C98JF7QQNY"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDPxbHA8Vwhw0SmmAF8HOfQ22GSSyGjbyI",
  authDomain: "opd-system-db.firebaseapp.com",
  projectId: "opd-system-db",
  storageBucket: "opd-system-db.appspot.com",
  messagingSenderId: "1024044226820",
  appId: "1:1024044226820:web:3ecf806decbc2fe589d851",
  measurementId: "G-DDCB456SZ6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
export default app;

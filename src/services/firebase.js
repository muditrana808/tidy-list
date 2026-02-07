import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8jtnPPi5U1JgDEh0wJ6NBIRTMt7XuwDg",
  authDomain: "tidy-list-46a91.firebaseapp.com",
  projectId: "tidy-list-46a91",
  storageBucket: "tidy-list-46a91.firebasestorage.app",
  messagingSenderId: "1045181476862",
  appId: "1:1045181476862:web:aa38e93c1ef2a31c559aaf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔒 FORCE persistent login
setPersistence(auth, browserLocalPersistence)
  .catch(error => {
    console.error("Auth persistence error:", error);
  });
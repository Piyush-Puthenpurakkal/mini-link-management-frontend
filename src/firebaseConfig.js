import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHfyqNQ2RKTXd5UaTyUGKz3XCmq6kMavM",
  authDomain: "mini-link-management.firebaseapp.com",
  projectId: "mini-link-management",
  storageBucket: "mini-link-management.firebasestorage.app",
  messagingSenderId: "882848961869",
  appId: "1:882848961869:web:eadd0f2bf91e8dc1f8d304",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

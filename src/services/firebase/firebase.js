import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut 
} from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};


export const signUpWithEmail = async (email, password, name) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(res.user, { displayName: name });
  return res.user;
};


export const loginWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);
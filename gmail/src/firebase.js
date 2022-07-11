import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvpD-kLYMo2bSDF48k_qg48DcZ8gM8cAs",
  authDomain: "clone-7f2b7.firebaseapp.com",
  projectId: "clone-7f2b7",
  storageBucket: "clone-7f2b7.appspot.com",
  messagingSenderId: "750505518092",
  appId: "1:750505518092:web:c73b3aafe4773f0850ba29"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }

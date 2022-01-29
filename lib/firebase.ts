import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC9vzqokPpDKP1FdC07Bx0SqZ9T1iBOyZA",
  authDomain: "yello-351fd.firebaseapp.com",
  projectId: "yello-351fd",
  storageBucket: "yello-351fd.appspot.com",
  messagingSenderId: "11381394554",
  appId: "1:11381394554:web:a4528e3be18ddc4bbcffc3"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage()
export const firestore = getFirestore()
export const auth = getAuth()

export const googleProvider = new GoogleAuthProvider()
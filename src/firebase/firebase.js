import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAnsD79Six_TjHN8C4jGl30eyG0s-DV7IA",
  authDomain: "blog-app-e7f51.firebaseapp.com",
  projectId: "blog-app-e7f51",
  storageBucket: "blog-app-e7f51.appspot.com",
  messagingSenderId: "984996367701",
  appId: "1:984996367701:web:7e1d6d23ebaac600d073dc",
  measurementId: "G-ZM57E4RG76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider(); 
export const storage = getStorage();
export const db = getFirestore(app);
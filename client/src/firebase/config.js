import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage" 

const firebaseConfig = {
  apiKey: "AIzaSyClWxeN1yj3WS2UHj7TzKAtP5kDJNfThGE",
  authDomain: "olxdummy-4734b.firebaseapp.com",
  projectId: "olxdummy-4734b",
  storageBucket: "olxdummy-4734b.appspot.com",
  messagingSenderId: "283930477770",
  appId: "1:283930477770:web:d2fdb6db73c57cc2236033",
  measurementId: "G-85JRFQTT9X"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage=getStorage(app);
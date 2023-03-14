import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyDDU94hUYa5Tvb6Wi-wLPmjo4Zos91W0FI',
  authDomain: "assistant-zara.firebaseapp.com",
  projectId: "assistant-zara",
  storageBucket: "assistant-zara.appspot.com",
  messagingSenderId: "98984424682",
  appId: "1:98984424682:web:1d7675abc077e4a9a65393"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
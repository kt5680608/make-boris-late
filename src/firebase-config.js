import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA-MSLyiMhcCqF2N8TI3_sIARPYXneZ1xA",
  authDomain: "lostark-homework-628a4.firebaseapp.com",
  projectId: "lostark-homework-628a4",
  storageBucket: "lostark-homework-628a4.appspot.com",
  messagingSenderId: "928027091494",
  appId: "1:928027091494:web:c95a72d7af5a8eeb263ce7",
  measurementId: "G-BT8M941Y1X",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN6v7ZTpR7gYxpoqKjj7lCLRiRXE5iIlI",
  authDomain: "react-native-social-3f153.firebaseapp.com",
  projectId: "react-native-social-3f153",
  storageBucket: "react-native-social-3f153.appspot.com",
  messagingSenderId: "889328697832",
  appId: "1:889328697832:web:45bac283b0d36c6f86e45d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqc0AGOOObUDKEg6a3_KSODfpX8KZU1eg",
  authDomain: "movie-review-5ef60.firebaseapp.com",
  projectId: "movie-review-5ef60",
  storageBucket: "movie-review-5ef60.appspot.com",
  messagingSenderId: "590520819695",
  appId: "1:590520819695:web:25d5661eb0127fa385201a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
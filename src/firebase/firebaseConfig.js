// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAb1LzBu7DXd6TQKSqVZoTdQxSMThOmo4",
  authDomain: "thu-vien-truong-hoc.firebaseapp.com",
  projectId: "thu-vien-truong-hoc",
  storageBucket: "thu-vien-truong-hoc.firebasestorage.app",
  messagingSenderId: "581546046066",
  appId: "1:581546046066:web:29eb3293afd01e7c97c8eb",
  measurementId: "G-X1QD4Y23DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Xuất db để sử dụng
export { db };

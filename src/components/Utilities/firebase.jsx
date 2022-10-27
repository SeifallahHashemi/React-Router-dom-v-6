// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi5_j_ULybQcRRED4wAPWtPH7RIfKzuRA",
  authDomain: "authentication-user-541a0.firebaseapp.com",
  projectId: "authentication-user-541a0",
  storageBucket: "authentication-user-541a0.appspot.com",
  messagingSenderId: "69384067497",
  appId: "1:69384067497:web:e918bd8212372aea678cb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 
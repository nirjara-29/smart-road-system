// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_bpuuvogY9FCooB9Ejbm_S5Sp4WnS1k4",
  authDomain: "smart-road-system-562f5.firebaseapp.com",
  projectId: "smart-road-system-562f5",
  storageBucket: "smart-road-system-562f5.firebasestorage.app",
  messagingSenderId: "691385796609",
  appId: "1:691385796609:web:0869fff22f26bc5872d800",
};


export const app = initializeApp(firebaseConfig);
// Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

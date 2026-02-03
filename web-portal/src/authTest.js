import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase"; // your firebase.js

const auth = getAuth(app);

async function testLogin() {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    "test@example.com",
    "password123"
  );

  const token = await userCredential.user.getIdToken();
  console.log("Firebase token:", token);

  // Call backend
  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log("Backend response:", data);
}

testLogin();

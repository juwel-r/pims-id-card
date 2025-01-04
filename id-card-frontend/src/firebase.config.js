// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export default auth;





import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD_nQx6AwVHH93l2x3fZ3KbVfz9YPFdKpw",
  authDomain: "pims-id-card.firebaseapp.com",
  projectId: "pims-id-card",
  storageBucket: "pims-id-card.firebasestorage.app",
  messagingSenderId: "859503340974",
  appId: "1:859503340974:web:356bd8d7965fbabe88ac3f",
  measurementId: "G-5X42DH1LKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;
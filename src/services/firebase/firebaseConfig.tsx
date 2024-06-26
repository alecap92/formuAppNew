// src/services/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdauL6r11kYPAlmYKSJsxvdi1LGeic1E4",
  authDomain: "formuapp-1665693078450.firebaseapp.com",
  projectId: "formuapp-1665693078450",
  storageBucket: "formuapp-1665693078450.appspot.com",
  messagingSenderId: "803533991053",
  appId: "1:803533991053:web:dea8acdfe7c1be968a86c4",
  measurementId: "G-XGY7GQVPLJ",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la autenticación y el proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

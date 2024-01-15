import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Importe seulement le module d'authentification si c'est tout ce dont tu as besoin
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push } from "firebase/database";

// config récupérée sur le site firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLW0_K_GOVoWxM2uY0Xi5JxI4u4f7nFuU",
  authDomain: "quiz-departements-d988b.firebaseapp.com",
  projectId: "quiz-departements-d988b",
  storageBucket: "quiz-departements-d988b.appspot.com",
  messagingSenderId: "367327240325",
  appId: "1:367327240325:web:471fedaa2ede677df5c9ec",
  databaseURL: "https://quiz-departements-d988b-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
// export const auth = app.auth(); // Exporte l'instance d'authentification
// const db = getFirestore(app);
const db = getDatabase(app);

export { app, db };

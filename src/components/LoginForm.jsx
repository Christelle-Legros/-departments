// import React, { useState } from "react";
// import { auth } from "./firebase"; // Chemin vers ton fichier firebase.js
// // import firebase from "firebase/compat/app"; // Importe firebase pour accéder à d'autres fonctionnalités
// import { db } from "./firebase"; // Importe l'instance de Firestore
// import { doc, getDoc, setDoc } from "firebase/firestore"; // Importe les méthodes Firestore nécessaires

// const LoginForm = (counterGoodAnswers) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [score, setScore] = useState(0); // Score à sauvegarder

//   const handleLogin = async () => {
//     try {
//       const userCredential = await auth.signInWithEmailAndPassword(
//         email,
//         password
//       );
//       console.log("Connecté en tant que:", userCredential.user.email);
//       // Tu peux rediriger l'utilisateur vers une autre page après la connexion ici -> vers le classement

//       // Récupère l'ID de l'utilisateur connecté
//       const userId = userCredential.user.uid;

//       // Enregistre le score dans Firestore
//       const newScore = counterGoodAnswers;
//       setScore(newScore);
//       const userRef = doc(db, "scores", userId);
//       await setDoc(userRef, {
//         score: newScore,
//       });

//       console.log(
//         "Score enregistré avec succès pour",
//         userCredential.user.email
//       );
//     } catch (error) {
//       console.error("Erreur de connexion:", error.message);
//       setErrorMessage("Oops, erreur de connexion");
//     }
//   };

//   return (
//     <div className="loginform">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="marie@curry.fr"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <p className="loginform__errormsg">{errorMessage}</p>
//       <button onClick={handleLogin}>Se connecter</button>
//     </div>
//   );
// };

// export default LoginForm;

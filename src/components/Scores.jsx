import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = ref(db, "scores");

    const handleSnapshot = (snapshot) => {
      const scoresData = snapshot.val();
      if (scoresData) {
        // Convertir l'objet des scores en un tableau
        const scoresArray = Object.entries(scoresData).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        // Triez le tableau en fonction du score en ordre décroissant puis du temps en ordre croissant
        scoresArray.sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.temps - b.temps;
        });

        setScores(scoresArray);
      }
    };

    const unsubscribe = onValue(scoresRef, handleSnapshot);

    return () => {
      // Désabonner lorsque le composant est démonté
      unsubscribe();
    };
  }, []);

  return (
    <div className="scores">
      <div className="scores__list">
        <h2>Classement | Jeu "Trouver les numéros":</h2>
        <ol>
          {scores
            .filter((score) => score.typeGame === "number")
            .map((score) => (
              <li key={score.id}>
                {score.nom} - Score: {score.score} - Temps: {score.temps}
              </li>
            ))}
        </ol>
      </div>

      <div className="scores__list">
        <h2>Classement | Jeu "Trouver les noms":</h2>
        <ol>
          {scores
            .filter((score) => score.typeGame === "name")
            .map((score) => (
              <li key={score.id}>
                {score.nom} - Score: {score.score} - Temps: {score.temps}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Scores;

import React, { useState } from "react";
import closeImg from "../assets/croix_rouge.png";
import { Link } from "react-router-dom";
// import { auth } from "./firebase"; // Chemin vers ton fichier firebase.js
import { db } from "./firebase";
import { ref, push } from "firebase/database";

const EndModal = ({
  setShowModal,
  counterGoodAnswers,
  objectsBadAnswers,
  handleReset,
  time,
  formatTime,
  typeGame,
}) => {
  const [userName, setUserName] = useState("");

  const endGame = () => {
    localStorage.clear();
    setShowModal(false);

    handleReset();
  };

  const scoresRef = ref(db, "scores");

  const enregistrerScore = (nom, score, temps, typeGame) => {
    push(scoresRef, {
      nom,
      score,
      temps,
      typeGame,
    });
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="endModalBackground"
      role="button"
      aria-hidden="true"
      onClick={(e) =>
        e.target.classList.contains("endModalBackground") && endGame()
      }
    >
      <div className="endModal">
        <div className="endModal__close">
          <Link to="/">
            <img
              src={closeImg}
              alt="Croix de fermeture fenêtre"
              onClick={endGame}
            />
          </Link>
        </div>

        <div className="endModal__msg">The End ! </div>
        <div className="endModal__counterMsg">
          Votre score est de{" "}
          <span id="nbGoodAnswers">{counterGoodAnswers} sur 10</span>
          <br />
          en <span id="timeGame">{formatTime(time)}</span>
        </div>

        <div className="endModal__errors">
          Les mauvaises réponses :
          <div className="endModal__errors__errors_list">
            {objectsBadAnswers.map((objet) => (
              <p
                className="endModal__errors__errors_list__items"
                key={objet.departmentNumber}
              >
                {objet.departmentNumber} - {objet.departmentName} | Votre rép :{" "}
                {objet.response}
              </p>
            ))}
          </div>
        </div>

        <div className="endModal__btnBottom">
          <div className="endModal__btnBottom-save">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onClick={handleInputClick}
              placeholder="Votre nom"
            />

            {userName === "" ? (
              <button disabled>Save le score</button>
            ) : (
              <Link to="/classement">
                <button
                  onClick={() =>
                    enregistrerScore(
                      userName.toUpperCase(),
                      counterGoodAnswers,
                      formatTime(time),
                      typeGame
                    )
                  }
                >
                  Save le score
                </button>
              </Link>
            )}
          </div>

          <Link to="/">
            <button className="endModal__btnAccueil" onClick={endGame}>
              Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EndModal;

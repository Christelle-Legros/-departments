import React, { useEffect } from "react";
import closeImg from "../assets/croix_rouge.png";
import { Link } from "react-router-dom";

const EndModal = ({ setShowModal, counterGoodAnswers, objectsBadAnswers }) => {
  const removeBadAnswers = () => {
    localStorage.clear();
    setShowModal(false);
  };

  return (
    <div
      className="endModalBackground"
      role="button"
      aria-hidden="true"
      onClick={removeBadAnswers}
    >
      <div className="endModal">
        <div className="endModal__close">
          <Link to="/">
            <img
              src={closeImg}
              alt="Croix de fermeture fenêtre"
              onClick={removeBadAnswers}
            />
          </Link>
        </div>

        <div className="endModal__msg">Partie terminée ! </div>
        <div className="endModal__counterMsg">
          Votre score est de {counterGoodAnswers} sur 10
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
        <Link to="/">
          <button className="endModal__btnAccueil" onClick={removeBadAnswers}>
            Accueil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EndModal;

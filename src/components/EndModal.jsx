import React from "react";
import closeImg from "../assets/croix_rouge.png";
import { Link } from "react-router-dom";

const EndModal = ({ hideModal, showModal, counterGoodAnswers }) => {
  return (
    <div
      className="endModalBackground"
      role="button"
      aria-hidden="true"
      onClick={() => hideModal()}
    >
      {/* <div className={showModal ? "modalAnimal" : "modalAnimal isHidden"}> */}
      <div className="endModal">
        <div className="endModal__close">
          <Link to="/">
            <img
              src={closeImg}
              alt="Croix de fermeture fenêtre"
              // onClick={() => hideModal()}
            />
          </Link>
        </div>

        <div className="endModal__msg">Partie terminée ! </div>
        <div className="endModal__counterMsg">
          Votre score est de {counterGoodAnswers} sur 10
        </div>
        <Link to="/">
          <button className="endModal__btnAccueil">Accueil</button>
        </Link>
      </div>
    </div>
  );
};

export default EndModal;

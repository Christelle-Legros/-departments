import React, { useEffect, useState } from "react";
import axios from "axios";
import EndModal from "./EndModal";

const QuizByName = () => {
  const [tab, setTab] = useState([]); // recupère le premier tableau de l'appel api
  const [departmentName, setDepartmentName] = useState(); // nom du département sélectionné
  const [departmentNumber, setDepartmentNumber] = useState(); // code du département sélectionné
  const [rValue, setRValue] = useState({}); // objet sélectionné du tableau
  const [response, setResponse] = useState("");
  const [winner, setWinner] = useState();
  const [counterGoodAnswers, setCounterGoodAnswers] = useState(0);
  const initialResponse = "";
  const [winnerMessage, setWinnerMessage] = useState("");
  const [counterAnswers, setCounterAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [objectsBadAnswers, setObjectsBadAnswers] = useState([]);

  useEffect(() => {
    axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
      setTab(res.data);
      console.log(tab);
    });
  }, []);

  // sort un département de manière aléatoire
  const randomDepartment = () => {
    const randomNumber = Math.floor(Math.random() * tab.length + 1); // sort un nombre aléatoire
    const randomValues = () => {
      setRValue(tab[randomNumber]);
      console.log(rValue);
      setDepartmentName(rValue.nom);
      setDepartmentNumber(rValue.code);
      setResponse(initialResponse);
      setWinnerMessage(" ");
    };
    randomValues();
  };

  const strNoAccent = (a) => a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const handleBadAnswer = (newObject) => {
    const newBadAnswers = [...objectsBadAnswers, newObject];
    setObjectsBadAnswers(newBadAnswers);
    localStorage.setItem("objets", JSON.stringify(newBadAnswers));
    console.log(localStorage.getItem("objets"));
  };

  const verifyWin = () => {
    if (counterAnswers <= 1) {
      if (
        strNoAccent(response.toUpperCase()) ==
        strNoAccent(departmentName.toUpperCase())
      ) {
        setWinner(true);
        setCounterGoodAnswers(counterGoodAnswers + 1);
        setCounterAnswers(counterAnswers + 1);
        setResponse(initialResponse);
        randomDepartment();
        setWinnerMessage("Bravo !");
      } else {
        setWinner(false);
        setCounterAnswers(counterAnswers + 1);
        setResponse(initialResponse);
        randomDepartment();
        setWinnerMessage("Perdu !");
        handleBadAnswer({ departmentName, departmentNumber, response });
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="quizByName_container">
      {tab && (
        <>
          <div className="quizByName_container__questionTitle">
            Quel est le nom du département qui porte le numéro...
          </div>
          <div className="quizByName_container__departmentNumber">
            {departmentNumber}
          </div>
          <div className="quizByName_container__answerContainer">
            <input
              type="text"
              onChange={(e) => setResponse(e.target.value)}
              value={response}
              required
              placeholder="mots séparés par -"
            />
            <button onClick={verifyWin}>Valider la réponse</button>{" "}
          </div>
          <div className="quizByName_container__winnerMsg">{winnerMessage}</div>
          {showModal && (
            <EndModal
              setShowModal={setShowModal}
              counterGoodAnswers={counterGoodAnswers}
              objectsBadAnswers={objectsBadAnswers}
            />
          )}
          {counterAnswers == 0 ? (
            <button
              className="quizByName_container__btnStart"
              onClick={randomDepartment}
            >
              Commencer !
            </button>
          ) : (
            <button className="quizByName_container__btnStartDisabled" disabled>
              Commencer !
            </button>
          )}

          <div>
            {counterGoodAnswers <= 1 ? (
              <div className="quizByName_container__nbGoodAnswers">
                Vous avez {counterGoodAnswers} bonne réponse
              </div>
            ) : (
              <div className="quizByName_container__nbGoodAnswers">
                Vous avez {counterGoodAnswers} bonnes réponses
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizByName;

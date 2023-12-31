import React, { useEffect, useState } from "react";
import axios from "axios";
import EndModal from "./EndModal";

const QuizByNumber = () => {
  const [tab, setTab] = useState([]); // recupère le premier tableau de l'appel api
  const [departmentName, setDepartmentName] = useState(); // nom du département sélectionné
  const [departmentNumber, setDepartmentNumber] = useState(); // code du département sélectionné
  const [rValue, setRValue] = useState({}); // objet sélectionné du tableau
  const [response, setResponse] = useState("");
  const [winner, setWinner] = useState();
  const [counterGoodAnswers, setCounterGoodAnswers] = useState(0);
  const initialResponse = "";
  const [winnerMessage, setWinnerMessage] = useState("");
  const initialWinnerMsg = "";
  const [counterAnswers, setCounterAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [objectsBadAnswers, setObjectsBadAnswers] = useState([]);

  useEffect(() => {
    axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
      setTab(res.data);
    });
  }, []);

  // sort un département de manière aléatoire
  const randomDepartment = () => {
    const randomNumber = Math.floor(Math.random() * tab.length + 1); // sort un nombre aléatoire

    const randomValues = () => {
      setRValue(tab[randomNumber]);
      setDepartmentName(rValue.nom);
      setDepartmentNumber(rValue.code);
      setResponse(initialResponse);
      setWinnerMessage(initialWinnerMsg);
    };
    randomValues();
  };

  // faire une boucle dans laquelle on sort un nombre aléatoire, et on le rajoute à un tableau de nb s'il n'y est pas déjà
  // récupérer les valeurs correspondantes dans le tableau des départements
  // a chaque appui sur le bouton, la valeur suivante est sélectionnée grace a setDepartmentName & setDepartmentNumber

  const handleBadAnswer = (newObject) => {
    const newBadAnswers = [...objectsBadAnswers, newObject];
    setObjectsBadAnswers(newBadAnswers);
    localStorage.setItem("objets", JSON.stringify(newBadAnswers));
  };

  const verifyWin = (e) => {
    e.preventDefault();
    if (counterAnswers <= 9) {
      if (response == departmentNumber) {
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
        setWinnerMessage(`Perdu ! La reponse etait : ` + departmentNumber);
        handleBadAnswer({ departmentName, departmentNumber, response });
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="quizByNumber_container">
      {tab && (
        <>
          <div className="quizByNumber_container__questionTitle">
            Quel est le numéro du département...
          </div>
          <div className="quizByNumber_container__departmentName">
            {departmentName}
          </div>
          <form>
            <div className="quizByNumber_container__answerContainer">
              <input
                type="text"
                onChange={(e) => setResponse(e.target.value)}
                value={response}
                required
                maxLength="3"
                placeholder="2 ou 3 chiffres"
              />

              {departmentName && response ? (
                <button type="submit" onClick={verifyWin}>
                  Valider la réponse
                </button>
              ) : (
                <button disabled>Valider la réponse</button>
              )}
            </div>
          </form>

          <div className="quizByNumber_container__winnerMsg">
            {winnerMessage}
          </div>

          {showModal && (
            <EndModal
              setShowModal={setShowModal}
              counterGoodAnswers={counterGoodAnswers}
              objectsBadAnswers={objectsBadAnswers}
            />
          )}
          {counterAnswers === 0 ? (
            <button
              className="quizByNumber_container__btnStart"
              onClick={randomDepartment}
            >
              Commencer !
            </button>
          ) : (
            <button
              className="quizByNumber_container__btnStartDisabled"
              disabled
            >
              Commencer !
            </button>
          )}

          <div>
            {counterGoodAnswers <= 1 ? (
              <div className="quizByNumber_container__nbGoodAnswers">
                Vous avez {counterGoodAnswers} bonne réponse
              </div>
            ) : (
              <div className="quizByNumber_container__nbGoodAnswers">
                Vous avez {counterGoodAnswers} bonnes réponses
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizByNumber;

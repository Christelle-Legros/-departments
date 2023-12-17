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
  const [counterAnswers, setCounterAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

  useEffect(() => {
    axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
      setTab(res.data);
      console.log(tab);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`https://geo.api.gouv.fr/departements`);
  //     setTab(response.data);
  //     console.log(tab);
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://geo.api.gouv.fr/departements")
  //     .then((res) => res.data)
  //     .then((data) => setTab(data))
  //     .then((data) => console.log(data));
  // }, []);

  // sort un département de manière aléatoire
  const randomDepartment = () => {
    const randomNumber = Math.floor(Math.random() * tab.length + 1); // sort un nombre aléatoire

    console.log(randomNumber);

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

  const verifyWin = () => {
    if (counterAnswers <= 7) {
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
        setWinnerMessage("Perdu !");
      }
    } else {
      setWinnerMessage("Fini");
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
          <div className="quizByNumber_container__answerContainer">
            <input
              type="text"
              onChange={(e) => setResponse(e.target.value)}
              value={response}
              required
              minlength="2"
              maxlength="3"
              placeholder="2 ou 3 chiffres"
            />
            <button onClick={verifyWin}>Valider la réponse</button>{" "}
          </div>
          <div className="quizByNumber_container__winnerMsg">
            {winnerMessage}
          </div>
          {showModal && (
            <EndModal
              showModal={showModal}
              setShowModal={setShowModal}
              hideModal={hideModal}
              counterGoodAnswers={counterGoodAnswers}
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

          <div className="quizByNumber_container__nbGoodAnswers">
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import EndModal from "./EndModal";

const QuizByNumber = () => {
  const [tab, setTab] = useState([]); // recupère le premier tableau de l'appel api
  const [departmentName, setDepartmentName] = useState(); // nom du département sélectionné
  const [departmentNumber, setDepartmentNumber] = useState(); // code du département sélectionné
  // const [rValue, setRValue] = useState({}); // objet sélectionné du tableau
  const [response, setResponse] = useState("");
  const [winner, setWinner] = useState();
  const [counterGoodAnswers, setCounterGoodAnswers] = useState(0);
  const initialResponse = "";
  const [winnerMessage, setWinnerMessage] = useState("");
  const [counterAnswers, setCounterAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [objectsBadAnswers, setObjectsBadAnswers] = useState([]);
  let tabRandomNr = [];
  const [currentIndex, setCurrentIndex] = useState(0);
  let currentNumber = 0;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
      setTab(res.data);
    });
  }, []);

  // random1 - sort un département de manière aléatoire
  // const randomDepartment = () => {
  //   const randomNumber = Math.floor(Math.random() * tab.length + 1); // sort un nombre aléatoire

  //   const randomValues = () => {
  //     setRValue(tab[randomNumber]);
  //     setDepartmentName(rValue.nom);
  //     setDepartmentNumber(rValue.code);
  //     setResponse(initialResponse);
  //     setWinnerMessage(initialWinnerMsg);
  //   };
  //   randomValues();
  // };

  // random2 - faire une boucle dans laquelle on sort un nombre aléatoire, et on le rajoute à un tableau de nb s'il n'y est pas déjà
  const extractNumbersRandom = () => {
    while (tabRandomNr.length < 10) {
      const randomNumber2 = Math.floor(Math.random() * tab.length); // génère un nombre aléatoire entre 0 et 101
      if (!tabRandomNr.includes(randomNumber2)) {
        console.log(randomNumber2);
        tabRandomNr.push(randomNumber2);
        // tabRandomNr = [...tabRandomNr, randomNumber2]; //ajoute le nb au tableau de nombres
      }
      console.log(tabRandomNr);
    }
  };

  // extraire les nombres un par un
  const randomDepartment2 = () => {
    console.log(tabRandomNr);
    if (currentIndex < tabRandomNr.length) {
      currentNumber = tabRandomNr[currentIndex];
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
      console.log("Chiffre extrait :", currentNumber); // À remplacer par l'action souhaitée avec le chiffre
    } else {
      console.log("Tous les chiffres extraits");
      console.log(currentIndex);
      console.log(tabRandomNr);
    }

    // récupérer les valeurs correspondantes dans le tableau des départements
    // a chaque appui sur le bouton, la valeur suivante est sélectionnée grace a setDepartmentName & setDepartmentNumber
    const selectDepartmentToFind = () => {
      setDepartmentName(tab[currentNumber].nom);
      setDepartmentNumber(tab[currentNumber].code);
    };
    selectDepartmentToFind();
  };

  // timer
  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  // formater le temps initialement en secondes
  const formatTime = (timeInSeconds) => {
    // const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")} min ${seconds
      .toString()
      .padStart(2, "0")} sec`;

    return formattedTime;
  };

  // start timer
  const handleStart = () => {
    setIsRunning(true);
  };

  // stop timer
  const handleStop = () => {
    setIsRunning(false);
  };

  // reset timer
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const startPartie = () => {
    setStarted(true);
    extractNumbersRandom();
    randomDepartment2();
    handleStart();
  };

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
        extractNumbersRandom();
        randomDepartment2();
        setWinnerMessage("Bravo !");
      } else {
        setWinner(false);
        setCounterAnswers(counterAnswers + 1);
        setResponse(initialResponse);
        extractNumbersRandom();
        randomDepartment2();
        setWinnerMessage(`Perdu ! La reponse etait : ` + departmentNumber);
        handleBadAnswer({ departmentName, departmentNumber, response });
      }
    } else {
      handleStop();
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
          {started === false ? (
            <button
              className="quizByNumber_container__btnStart"
              onClick={startPartie}
            >
              Commencer !
            </button>
          ) : (
            <div className="quizByNumber_container__timer">
              {formatTime(time)}
            </div>
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

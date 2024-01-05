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
  const [randomElements, setRandomElements] = useState([]); // tab qui contient 10 éléments mélangés du tab de départ (random)

  useEffect(() => {
    axios.get(`https://geo.api.gouv.fr/departements`).then((res) => {
      setTab(res.data);
    });
  }, []);

  // random du tableau entier récupéré
  const shuffleArray = (array) => {
    // Algorithme de mélange de Fisher-Yates pour mélanger le tableau
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const selectRandom = () => {
      const shuffledArray = shuffleArray([...tab]); // Copie mélangée du tableau initial
      const selectedElements = shuffledArray.slice(0, 10); // Sélectionne les 10 premiers éléments mélangés
      setRandomElements(selectedElements);
      console.log(randomElements);
    };
    selectRandom();
  }, [tab]);

  const handleNext = () => {
    if (currentIndex < randomElements.length) {
      const currentObject = randomElements[currentIndex];
      setCurrentIndex(currentIndex + 1);
      console.log("Objet extrait :", currentObject);
      setDepartmentName(currentObject.nom);
      setDepartmentNumber(currentObject.code);
    } else {
      console.log("Tous les objets ont été extraits.");
      // Ajouter ici une action pour indiquer que tous les objets ont été extraits
    }
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

  // formater le temps donné initialement en secondes
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
    handleNext();
    handleStart();
  };

  const handleBadAnswer = (newObject) => {
    const newBadAnswers = [...objectsBadAnswers, newObject];
    setObjectsBadAnswers(newBadAnswers);
    localStorage.setItem("objets", JSON.stringify(newBadAnswers));
  };

  const verifyWin = (e) => {
    e.preventDefault();
    if (counterAnswers <= 8) {
      if (response == departmentNumber) {
        setWinner(true);
        setCounterGoodAnswers(counterGoodAnswers + 1);
        setCounterAnswers(counterAnswers + 1);
        setResponse(initialResponse);
        handleNext();
        setWinnerMessage("Bravo !");
      } else {
        setWinner(false);
        setCounterAnswers(counterAnswers + 1);
        setResponse(initialResponse);
        handleNext();
        setWinnerMessage(`Perdu ! La reponse etait : ` + departmentNumber);
        handleBadAnswer({ departmentName, departmentNumber, response });
      }
    } else {
      if (response == departmentNumber) {
        handleStop();
        setShowModal(true);
        setWinner(true);
        setCounterAnswers(counterAnswers + 1);
        setWinnerMessage("Bravo !");
        setCounterGoodAnswers(counterGoodAnswers + 1);
      } else {
        handleStop();
        setShowModal(true);
        setWinner(false);
        setCounterAnswers(counterAnswers + 1);
        setWinnerMessage(`Perdu ! La reponse etait : ` + departmentNumber);
        handleBadAnswer({ departmentName, departmentNumber, response });
      }
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
              handleReset={handleReset}
              time={time}
              formatTime={formatTime}
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

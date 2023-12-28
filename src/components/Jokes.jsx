import React, { useEffect, useState } from "react";
import axios from "axios";

const Jokes = () => {
  const [joke, setJoke] = useState();
  const [jokeQuestion, setJokeQuestion] = useState();
  const [jokeAnswer, setJokeAnswer] = useState();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  let cleAPI = process.env.REACT_APP_TOKEN_JOKES;

  useEffect(() => {
    axios
      .get(
        "https://www.blagues-api.fr/api/random?disallow=dark&disallow=limit",
        {
          headers: {
            Authorization: cleAPI,
          },
        }
      )
      .then((res) => setJoke(res.data))
      .then(console.log(joke));
  }, []);

  const askJoke = () => {
    setJokeQuestion(joke.joke);
    setShowQuestion(true);
  };

  const askAnswer = () => {
    setJokeAnswer(joke.answer);
    setShowAnswer(true);
  };

  return (
    <div className="jokes">
      <button className="jokes__askJoke" onClick={askJoke}>
        Une petite blague ?
      </button>
      {showQuestion ? (
        <>
          <div className="jokes__jokeQuestion">{jokeQuestion}</div>

          <div className="jokes__answerContainer">
            <button className="jokes__answerBtn" onClick={askAnswer}>
              Réponse
            </button>
            {showAnswer ? (
              <div className="jokes__jokeAnswer">{jokeAnswer}</div>
            ) : (
              <div></div>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Jokes;

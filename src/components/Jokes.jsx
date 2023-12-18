import React, { useEffect, useState } from "react";
import axios from "axios";

const Jokes = () => {
  const [joke, setJoke] = useState();
  const [jokeQuestion, setJokeQuestion] = useState();
  const [jokeAnswer, setJokeAnswer] = useState();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  //   const fetch = require("node-fetch");

  //   fetch("https://www.blagues-api.fr/api/random", {
  //     headers: {
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODg2OTE1NjczMTgyMzIyNzc5IiwibGltaXQiOjEwMCwia2V5IjoiVFlrT0R4ZEY2Ujl3SXhtV3AwTWRqYng1bEJrMEJJRkU4ek1EaEhzR1E4bkpuQUl6dlkiLCJjcmVhdGVkX2F0IjoiMjAyMy0xMi0xOFQxNDoxMDowOSswMDowMCIsImlhdCI6MTcwMjkwODYwOX0.4ekdc7pHuPbkqshG6qmvahGBIZxTVF2Uv6F0X6rtdqQ",
  //     },
  //   })
  //     .then((res) => res.json())
  //     // .then((json) => console.log(json));
  //     .then((json) => setJokeQuestion(json.joke));

  useEffect(() => {
    axios
      .get(
        "https://www.blagues-api.fr/api/random?disallow=dark&disallow=limit",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODg2OTE1NjczMTgyMzIyNzc5IiwibGltaXQiOjEwMCwia2V5IjoiVFlrT0R4ZEY2Ujl3SXhtV3AwTWRqYng1bEJrMEJJRkU4ek1EaEhzR1E4bkpuQUl6dlkiLCJjcmVhdGVkX2F0IjoiMjAyMy0xMi0xOFQxNDoxMDowOSswMDowMCIsImlhdCI6MTcwMjkwODYwOX0.4ekdc7pHuPbkqshG6qmvahGBIZxTVF2Uv6F0X6rtdqQ",
          },
        }
      )
      .then((res) => setJoke(res.data))
      .then(console.log(joke));
    //   .then(setJokeQuestion(joke.joke));
    //   .then(setJokeAnswer(joke.answer));
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
      <div role="button" onClick={askJoke}>
        Une petite blague ?
      </div>
      {showQuestion ? (
        <>
          <div className="jokes__jokeQuestion">{jokeQuestion}</div>

          <button className="jokes__answerBtn" onClick={askAnswer}>
            Réponse
          </button>
          {showAnswer ? (
            <div className="jokes__jokeQuestion">{jokeAnswer}</div>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Jokes;

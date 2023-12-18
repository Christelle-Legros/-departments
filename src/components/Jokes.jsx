import React from "react";

const Jokes = async () => {
  const fetch = require("node-fetch");

  fetch("https://blague.xyz/api/joke/random", {
    headers: { Authorization: "TOKEN" },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));

  return <div></div>;
};

export default Jokes;

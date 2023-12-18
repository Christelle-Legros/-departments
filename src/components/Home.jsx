import React from "react";
import numeros from "../assets/numeros.jpg";
import nomsDepartements from "../assets/noms_departements.png";
import { Link } from "react-router-dom";
import Jokes from "./Jokes";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeContainer__logos">
        <div className="homeContainer__logos__img">
          <Link to="/bynumber">
            <img src={numeros} alt="numéros" />
          </Link>
          <div className="homeContainer__logos__img__text">
            Trouver les numéros de départements
          </div>
        </div>

        <div className="homeContainer__logos__img">
          <Link to="/byname">
            <img src={nomsDepartements} alt="Noms departements" />
          </Link>

          <div className="homeContainer__logos__img__text">
            Trouver les noms de départements
          </div>
        </div>
      </div>

      <div className="homeContainer__joke">
        <Jokes />
      </div>
    </div>
  );
};

export default Home;

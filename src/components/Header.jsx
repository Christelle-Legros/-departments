import React from "react";
import logo from "../assets/Quiz_logo.png";
import { Link } from "react-router-dom";
import btnHelp from "../assets/pt_interro_vert.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/home">
        <img className="header__logo" alt="Logo quiz" src={logo} />
      </Link>

      <Link to="/help">
        <img
          className="header__ptInterro"
          alt="Point interrogation"
          src={btnHelp}
        />
      </Link>
    </div>
  );
};

export default Header;

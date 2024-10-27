import React from "react";
import "../styles/header.css";
import pokeballImg from "../img/Pokeball.png";

const Header = () => {
  return (
    <div className="header-pokedex">
      <div className="title">
        <h1>
          <img src={pokeballImg} alt="pokeball" />
          Manon's Pokedex
          <img src={pokeballImg} alt="pokeball" />
        </h1>
      </div>
      <div className="blank"></div>
    </div>
  );
};

export default Header;

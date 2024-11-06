import React from "react";
import "../styles/header.css";
import pokeballImg from "../img/Pokeball.png";
import pikachu from "../img/pikachu1.png";

const Header = () => {
  return (
    <div className="header-pokedex">
      {/* LEFT PART  */}
      <div className="title">
        <img src={pokeballImg} alt="pokeball" />
        <h1>Manon's Pokedex</h1>
      </div>
      {/* RIGHT PART  */}
      <div className="blank-header">
        <img src={pikachu} alt="pikachu" />
      </div>
    </div>
  );
};

export default Header;

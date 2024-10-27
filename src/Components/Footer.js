import React from "react";
import "../styles/footer.css";
import houseImg from "../img/House.png";
import pokeballImg from "../img/Pokeball.png";
import starImg from "../img/star.png";

const Footer = () => {
  return (
    <div className="footer-pokedex">
      <div className="violet">
        <button>
          <img src={houseImg} alt="logo maison" />
          Accueil
        </button>
        <button>
          <img src={pokeballImg} alt="logo pokeball" />
          PokéList
        </button>
        <button>
          <img src={starImg} alt="logo étoiles" />
          Mes Fav'
        </button>
      </div>
      <div className="blank"></div>
    </div>
  );
};

export default Footer;

import React from "react";
import "../styles/footer.css";
import houseImg from "../img/House.png";
import pokeballImg from "../img/Pokeball.png";
import starImg from "../img/star.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-pokedex">
      <div className="violet">
        <NavLink className="footer-navlink" to="/">
          <button>
            <img src={houseImg} alt="logo maison" />
            Accueil
          </button>
        </NavLink>
        <NavLink className="footer-navlink" to="list">
          <button>
            <img src={pokeballImg} alt="logo pokeball" />
            PokéList
          </button>
        </NavLink>
        <NavLink className="footer-navlink" to="favorites">
          <button>
            <img src={starImg} alt="logo étoiles" />
            Mes Fav'
          </button>
        </NavLink>
      </div>
      <div className="blank"></div>
    </div>
  );
};

export default Footer;

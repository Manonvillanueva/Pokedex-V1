import React from "react";
import "../styles/footer.css";
import houseImg from "../img/House.png";
import pokeballImg from "../img/Pokeball.png";
import starImg from "../img/star.png";
import pyroli from "../img/Pyroli-Pokedex.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-pokedex">
      <div className="violet">
        <NavLink
          className={({ isActive }) =>
            `footer-navlink ${isActive ? "active-link" : ""}`
          }
          to="/"
        >
          <img src={houseImg} alt="logo maison" />
          Accueil
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `footer-navlink ${isActive ? "active-link" : ""}`
          }
          to="list"
        >
          <img src={pokeballImg} alt="logo pokeball" />
          PokéList
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `footer-navlink ${isActive ? "active-link" : ""}`
          }
          to="favorites"
        >
          <img src={starImg} alt="logo étoiles" />
          Mes Fav'
        </NavLink>
      </div>
      <div className="blank-footer">
        <img src={pyroli} alt="pyroli" />
      </div>
    </div>
  );
};

export default Footer;

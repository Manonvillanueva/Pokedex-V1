import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";
import houseImg from "../img/House.png";
import pokeballImg from "../img/Pokeball.png";
import starImg from "../img/star.png";
import pyroli from "../img/Pyroli-Pokedex.png";

const Footer = () => {
  return (
    <div className="footer-pokedex">
      {/* LEFT PART  */}
      <div className="violet">
        {/* LINK HOME PART  */}
        <NavLink
          // Utilisation d'une classe isActive pour changer les effets du lien qui est selectionné
          className={({ isActive }) =>
            `footer-navlink ${isActive ? "active-link" : ""}`
          }
          to="/"
        >
          <img src={houseImg} alt="logo maison" />
          Accueil
        </NavLink>

        {/* LINK POKELIST PART  */}
        <NavLink
          className={({ isActive }) =>
            `footer-navlink ${isActive ? "active-link" : ""}`
          }
          to="list"
        >
          <img src={pokeballImg} alt="logo pokeball" />
          PokéList
        </NavLink>

        {/* LINK FAV PART  */}
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

      {/* RIGHT PART  */}
      <div className="blank-footer">
        <img src={pyroli} alt="pyroli" />
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { NavLink } from "react-router-dom";
import gradients from "../json/gradients.json";
import "../styles/fav.css";

const Fav = ({ dataPoke }) => {
  const item = JSON.parse(localStorage.getItem("pokemon") || "[]");

  const favoriteItem = dataPoke
    .filter((pokemon) => item.includes(pokemon.id))
    .map((pokemon) => (
      <NavLink
        className="navlink"
        to={`/pokemon/${pokemon.id}`}
        key={pokemon.id}
      >
        <li
          style={{
            background:
              gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[0] ||
              "transparent",
            border: `4px solid ${
              gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[1] ||
              "transparent"
            }`,
          }}
          className="li-fav"
        >
          <img src={pokemon.image} alt={pokemon.name}></img>
          <p>{pokemon.name}</p>
        </li>
      </NavLink>
    ));

  return (
    <div>
      <ul className="ul-fav">{favoriteItem}</ul>
    </div>
  );
};

export default Fav;

import React from "react";
import { NavLink } from "react-router-dom";
import gradients from "../json/gradients.json";
import "../styles/fav.css";

const Fav = ({ dataPoke }) => {
  const item = JSON.parse(localStorage.getItem("pokemon") || "[]");

  const styleGradients = (pokemon) => {
    return {
      background:
        gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[0] || "transparent",
      border: `4px solid ${
        gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[1] || "transparent"
      }`,
    };
  };

  const favoriteItem = dataPoke
    .filter((pokemon) => item.includes(pokemon.id))
    .map((pokemon) => (
      <li key={pokemon.id} style={styleGradients(pokemon)} className="li-fav">
        <NavLink className="navlink-fav" to={`/pokemon/${pokemon.id}`}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </NavLink>
      </li>
    ));

  return (
    <div className="fav-container">
      {item.length > 0 ? (
        <ul className="ul-fav">{favoriteItem}</ul>
      ) : (
        <p>Aucun Pokémon dans vos favoris ...</p>
      )}
    </div>
  );
};

export default Fav;

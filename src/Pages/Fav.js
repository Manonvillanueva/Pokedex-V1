import React from "react";
import { NavLink } from "react-router-dom";

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
        <li>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprite} alt={pokemon.name}></img>
        </li>
      </NavLink>
    ));

  return (
    <div>
      <ul>{favoriteItem}</ul>
    </div>
  );
};

export default Fav;

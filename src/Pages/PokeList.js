import React, { useState } from "react";
import "../styles/pokeList.css";
import { NavLink } from "react-router-dom";

const PokeList = ({ dataPoke }) => {
  const [searchPoke, setSearchPoke] = useState("");
  const [sortPokemon, setSortPokemon] = useState("");

  return (
    <div className="pokeList-container">
      <div className="pokeList-nav">
        <input
          className="searchBar"
          type="text"
          placeholder="Nom du Pokémon ..."
          onChange={(e) => setSearchPoke(e.target.value)}
        />
        <select
          onChange={(e) => setSortPokemon(e.target.value)}
          name="triPoke"
          id=""
        >
          <option value="">Tous les Pokémons</option>
          <option value="aToZ">A-Z</option>
          <option value="zToA">Z-A</option>
        </select>
      </div>
      <ul className="ul-pokeList">
        {dataPoke
          .filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchPoke.toLowerCase());
          })
          .sort((a, b) => {
            if (sortPokemon === "aToZ") {
              return a.name.localeCompare(b.name);
            } else if (sortPokemon === "zToA") {
              return b.name.localeCompare(a.name);
            }
            return 0;
          })
          .map((pokemon) => {
            return (
              <NavLink
                key={pokemon.id}
                className="navlink"
                to={`/pokemon/${pokemon.id}`}
              >
                <li className="li-pokeList">
                  <img
                    className="img-pokeList"
                    src={pokemon.sprite}
                    alt={pokemon.name}
                  />
                  <span className="id-pokeList">{pokemon.id}</span>
                  <p className="name-pokeList">{pokemon.name}</p>
                </li>
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
};

export default PokeList;

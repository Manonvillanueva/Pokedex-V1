import React, { useEffect, useRef, useState } from "react";
import "../styles/pokeList.css";
import { NavLink } from "react-router-dom";

const PokeList = ({ dataPoke }) => {
  // État pour stocker la valeur de recherche du Pokémon
  const [searchPoke, setSearchPoke] = useState("");
  // État pour stocker le critère de tri sélectionné pour les Pokémon
  const [sortPokemon, setSortPokemon] = useState("");

  const pokeListRef = useRef(null);

  const savedPosition = () => {
    localStorage.setItem("scrollPosition", pokeListRef.current.scrollTop);
  };

  useEffect(() => {
    pokeListRef.current.scrollTop = localStorage.getItem("scrollPosition");
  }, []);

  return (
    <div className="pokeList-container" ref={pokeListRef}>
      <div className="pokeList-nav">
        {/* Met à jour l'état searchPoke avec la valeur saisie par l'utilisateur */}
        <input
          className="searchBar"
          type="text"
          placeholder="Nom du Pokémon ..."
          onChange={(e) => setSearchPoke(e.target.value)}
        />
        {/* Met à jour l'état sortPokemon avec l'option sélectionnée dans le menu déroulant le e.target.value représente les values dans option*/}
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
          // Filtrage des Pokemon en fonction de la recherche dans la searchBar
          // Détermine quels éléments de la liste d'origine seront inclus dans le tableau filtré (fonctionnement d'un booléen true ou false)
          .filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchPoke.toLowerCase());
          })
          // Trie les Pokémon selon le critère sélectionné
          // Utilisation de la méthode localeCompare() pour comparer deux chaînes de caractères
          .sort((a, b) => {
            if (sortPokemon === "aToZ") {
              return a.name.localeCompare(b.name);
            } else if (sortPokemon === "zToA") {
              return b.name.localeCompare(a.name);
            }
            return 0;
          })
          // Affichage de la liste de Pokémon avec les données de dataPoke fournies par l'API
          .map((pokemon) => {
            return (
              <li key={pokemon.id} className="li-pokeList">
                {/* // Lien sur chaque élément de la liste , qui emmène vers le détail de celui-ci */}
                <NavLink
                  className="navlink-pokelist"
                  // Lien vers la page du Pokémon, en concaténant la route et l'ID du Pokémon
                  to={`/pokemon/${pokemon.id}`}
                  onClick={savedPosition}
                >
                  <img
                    className="img-pokeList"
                    src={pokemon.sprite}
                    alt={pokemon.name}
                  />
                  <span className="id-pokelist">{pokemon.id}</span>
                  <p className="name-pokelist">{pokemon.name}</p>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PokeList;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import gradients from "../json/gradients.json";
import "../styles/fav.css";

const Fav = ({ dataPoke }) => {
  // Retirer l'élément de scroll position stocké dans le localStorage
  // Pour revenir en haut de la POKELIST et non à cette pos enregistrée
  localStorage.removeItem("scrollPosition");
  // Récupération de la liste des IDs des Pokémon favoris stockée dans le localStorage
  const item = JSON.parse(localStorage.getItem("pokemon") || "[]");

  // Fonction pour définir le style des éléments favoris en fonction du premier type du Pokémon
  // gradients est le fichier JSON gradients
  const styleGradients = (pokemon) => {
    return {
      // Applique un dégradé comme fond en fonction du type du Pokémon
      background:
        gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[0] || "transparent",
      // Applique une bordure colorée en fonction du type du Pokémon
      border: `4px solid ${
        gradients[pokemon.apiTypes[0].name.toLowerCase()]?.[1] || "transparent"
      }`,
    };
  };

  // Création de la liste des éléments favoris à afficher
  const favoriteItem =
    // Filre les Pokémon dont l'ID est dans la liste des favoris
    dataPoke
      .filter((pokemon) => item.includes(pokemon.id))
      // Puis les parcourir pour créer une liste de ces pokémons
      .map((pokemon) => (
        <li key={pokemon.id} style={styleGradients(pokemon)} className="li-fav">
          {/* Lien vers la page de détail du Pokémon */}
          <NavLink className="navlink-fav" to={`/pokemon/${pokemon.id}`}>
            {/* Image du Pokémon  */}
            <img src={pokemon.image} alt={pokemon.name} />
            {/* Nom du Pokémon  */}
            <p>{pokemon.name}</p>
          </NavLink>
        </li>
      ));

  return (
    <div className="fav-container">
      {/* Si la liste des favoris n'est pas vide, on affiche la liste des Pokémon favoris */}
      {item.length > 0 ? (
        <ul className="ul-fav">{favoriteItem}</ul>
      ) : (
        // Si aucun Pokémon n'est dans les favoris, on affiche ce message
        <p>Aucun Pokémon dans vos favoris ...</p>
      )}
    </div>
  );
};

export default Fav;

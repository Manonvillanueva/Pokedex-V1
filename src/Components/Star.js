import React, { useEffect, useState } from "react";
import yellowStar from "../img/yellowStar.png";
import fullYellowStar from "../img/fullYellowStar.png";
import "../styles/star.css";

// Reception des données du Pokémon correspondant via foundPokemon
const Star = ({ foundPokemon }) => {
  // Etat like détermine si  l'étoile est pleine (Pokémon favoris) ou vide (Pokémon non favoris)
  const [like, setLike] = useState(false);

  // Au montage du composant sert à changer l'état de like
  useEffect(() => {
    // Récupération de la liste des ids des Pokémons favoris dans le localStorage
    let favList = localStorage.getItem("pokemon");
    // Ensuite on parse les données pour avoir un tableau JS afin de réutiliser les données
    let pokemonFav = favList ? JSON.parse(favList) : [];
    // Si l'id du Pokémon est dans les fav alors tu me change l'état de like pour afficher une étoile pleine
    if (pokemonFav.includes(foundPokemon.id)) {
      setLike(true);
    }
  }, [foundPokemon]);

  // AJOUT-SUPPRESSION-MAJ DU LOCAL STORAGE
  const addAndDeleteFavorites = () => {
    // AJOUTER AU LOCAL STORAGE
    // Récupération de la liste des ids des Pokémons favoris dans le localStorage
    let favList = localStorage.getItem("pokemon");
    let pokemonFav = favList ? JSON.parse(favList) : [];
    // Si l'ID du Pokémon n'est pas dans la liste des favoris (évite les doublons)
    if (!pokemonFav.includes(foundPokemon.id)) {
      // On ajoute l'ID du Pokémon dans la liste des favoris
      pokemonFav.push(foundPokemon.id);
      //  On met à jour la liste des fav dans le localStorage
      window.localStorage.setItem("pokemon", JSON.stringify(pokemonFav));
      // On change l'état de like afin que l'étoile soit pleine
      setLike(true);
    } else {
      // SUPPRIMER DU LOCAL STORAGE
      // Utilisation de .filter afin de créer un nouveau tableau contenant tous les éléments du tableau d'origine qui remplisse la condition (id !== foundPokemon.id), pour retirer l'ID du localStorage
      const filterLocalStorage = pokemonFav.filter(
        (id) => id !== foundPokemon.id
      );
      // Met à jour le localStorage avec le nouveau tableau filterLocalStorage
      window.localStorage.setItem(
        "pokemon",
        JSON.stringify(filterLocalStorage)
      );
      // On change l'état de like afin que l'étoile soit vide
      setLike(false);
    }
  };

  return (
    <div>
      {/* Image de l'étoile qui change selon l'état "like"  ET joue la fonction pour supprimer et ajouter aux favoris*/}
      <img
        className="yellow-star"
        onClick={addAndDeleteFavorites}
        src={like ? fullYellowStar : yellowStar}
        alt={like ? "dans mes favoris" : "pas encore dans mes favoris"}
      />
    </div>
  );
};

export default Star;

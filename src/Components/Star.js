import React, { useEffect, useState } from "react";
import yellowStar from "../img/yellowStar.png";
import fullYellowStar from "../img/fullYellowStar.png";
import "../styles/star.css";

const Star = ({ foundPokemon }) => {
  const [like, setLike] = useState(false);
  console.log(foundPokemon);

  useEffect(() => {
    if (!foundPokemon) {
      return;
    }
    let favList = localStorage.getItem("pokemon");
    let pokemonFav = favList ? JSON.parse(favList) : [];
    if (pokemonFav.includes(foundPokemon.id)) {
      setLike(true);
    }
  }, [foundPokemon]);

  const addAndDeleteFavorites = () => {
    let favList = localStorage.getItem("pokemon");
    let pokemonFav = favList ? JSON.parse(favList) : [];
    if (!pokemonFav.includes(foundPokemon.id)) {
      pokemonFav.push(foundPokemon.id);
      window.localStorage.setItem("pokemon", JSON.stringify(pokemonFav));
      setLike(true);
    } else {
      const filterLocalStorage = pokemonFav.filter(
        (id) => id !== foundPokemon.id
      );
      window.localStorage.setItem(
        "pokemon",
        JSON.stringify(filterLocalStorage)
      );
      setLike(false);
    }
  };

  return (
    <div>
      <img
        className="yellow-star"
        onClick={addAndDeleteFavorites}
        src={like ? fullYellowStar : yellowStar}
        alt=""
      />
    </div>
  );
};

export default Star;

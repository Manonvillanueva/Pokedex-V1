import React, { useEffect, useState } from "react";
import "../styles/accueil.css";

const Accueil = ({ dataPoke }) => {
  const [currentIndex, setCurrentIndex] = useState(112);

  useEffect(() => {
    const handleIndex = (e) => {
      if (e.key === "ArrowUp") {
        setCurrentIndex(
          (index) => (index - 1 + dataPoke.length) % dataPoke.length
        );
      } else if (e.key === "ArrowDown") {
        setCurrentIndex((index) => (index + 1) % dataPoke.length);
      }
    };
    window.addEventListener("keydown", handleIndex);
    return () => {
      window.removeEventListener("keydown", handleIndex);
    };
  }, [dataPoke.length]);

  const displayIndex = [
    (currentIndex - 1 + dataPoke.length) % dataPoke.length,
    currentIndex,
    (currentIndex + 1) % dataPoke.length,
  ];

  return (
    <div className="accueil-container">
      <div className="left-part">
        <img
          src={dataPoke[currentIndex] ? dataPoke[currentIndex].image : null}
          alt={dataPoke[currentIndex]?.name}
        />
      </div>
      <div className="right-part">
        <ul className="ul-accueil">
          {displayIndex.map((index) => {
            const pokemon = dataPoke[index];
            if (!pokemon) return null;
            const isCurrent = index === currentIndex;
            return (
              <li
                className={`list-container ${isCurrent ? "current" : ""}`}
                key={pokemon.id}
              >
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Accueil;

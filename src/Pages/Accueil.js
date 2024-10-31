import React, { useEffect, useRef, useState } from "react";
import "../styles/accueil.css";

const Accueil = ({ dataPoke }) => {
  // État pour suivre l'index du Pokémon actuellement affiché
  const [currentIndex, setCurrentIndex] = useState(6);
  const effectRef = useRef(null);

  const mouseEffect = (e) => {
    const effect = effectRef.current;
    if (!effect) return;
    let rect = effect.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let midCardWidth = rect.width / 2;
    let midCardHeight = rect.height / 2;
    let angleY = -(x - midCardWidth) / 10;
    let angleX = (y - midCardHeight) / 10;

    effect.children[0].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
  };

  useEffect(() => {
    // Fonction pour gérer les changements d'index avec les touches fléchées
    // Lorsque l'utilisateur appuie sur les touches fléchées (ArrowUp ou ArrowDown), la fonction est déclenchée et détecte laquelle a été préssée grâce à l'évènement(e)
    // On peut le vérifier en faisant un console.log(e.key)
    const handleIndex = (e) => {
      if (e.key === "ArrowUp") {
        setCurrentIndex(
          // (index - 1 + dataPoke.length) garantit que l'index reste positif
          // %dataPoke.length de passer de Pokemon[0] à Pokemon[MAX]
          // Le modulo(%), calcule le reste de la division.
          (index) => (index - 1 + dataPoke.length) % dataPoke.length
        );
      } else if (e.key === "ArrowDown") {
        // Augmente l'index de 1 pour passer au Pokémon suivant, et on utilise le %dataPoke.length afin que si on arrive à Pokemon[MAX] il nous renvoie au Pokemon [0]
        setCurrentIndex((index) => (index + 1) % dataPoke.length);
      }
    };
    // Mettre cet évènement dans le useEffect empêche l'accumulation d'écouteurs d'événements(window.addEventListener("keydown", handleIndex))
    // Si je l'avais mis en dehors, un nouvel écouteur aurait été crée à chaque re-rendu (comme par exemple ma fonction setCurrentIndex),
    // Donc si j'appuie sur une touche ma fonction handleIndex se serait appelé plusieurs fois et non une seule fois ce qui aurait crée un comportement inatendu
    window.addEventListener("keydown", handleIndex);
    return () => {
      window.removeEventListener("keydown", handleIndex);
    };
  }, [dataPoke.length]);

  // Le tableau displayIndex affichera seulement 3 Pokémons :
  // [Pokemon[précédent(I-1)],Pokemon[actuel(I)],Pokemon[suivant(I+1)]]
  const displayIndex = [
    (currentIndex - 1 + dataPoke.length) % dataPoke.length,
    currentIndex,
    (currentIndex + 1) % dataPoke.length,
  ];

  return (
    <div className="accueil-container">
      <div className="left-part">
        <div className="effect" ref={effectRef} onMouseMove={mouseEffect}>
          <div className="img-content">
            <img
              src={dataPoke[currentIndex] ? dataPoke[currentIndex].image : null}
              alt={dataPoke[currentIndex]?.name}
            />
          </div>
        </div>
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

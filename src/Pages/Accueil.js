import React, { useEffect, useRef, useState } from "react";
import "../styles/accueil.css";
import pokeballColor from "../img/pokeballColor.png";
import { NavLink } from "react-router-dom";

const Accueil = ({ dataPoke }) => {
  // État pour suivre l'index du Pokémon actuellement affiché
  // Initialisation de currentIndex entre 0 et 150 pour afficher un Pokémon au hasard
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * 150)
  );

  // Accéder à l'élément du DOM .effect
  const effectRef = useRef(null);

  // Gestion de l'effet 3D de la carte
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
    // Retirer l'élément de scroll position stocké dans le localStorage à chaque chargement
    // Pour revenir en haut de la pokeList et non à cette pos enregistrée
    localStorage.removeItem("scrollPosition");
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
      {/* LEFT PART - IMG POKEMON */}
      <div className="left-part">
        {/* Élément qui applique un effet 3D lorsque l'utilisateur déplace la souris */}
        <div className="effect" ref={effectRef} onMouseMove={mouseEffect}>
          <div className="img-content">
            {/* Si le Pokémon est défini au currentIndex, alors on affiche son image */}
            <img
              src={dataPoke[currentIndex] ? dataPoke[currentIndex].image : null}
              alt={dataPoke[currentIndex]?.name}
            />
          </div>
        </div>
      </div>

      {/* RIGHT PART - DISPLAY 3 POKEMONS  */}
      <div className="right-part">
        <ul className="ul-accueil">
          {/* Parcourt chaque élément de displayInedx  */}
          {displayIndex.map((index) => {
            // Pour chaque index dans displayIndex, on récupère le Pokémon correspondant dans dataPoke (données de l'API)
            const pokemon = dataPoke[index];
            if (!pokemon) return null;
            // Booléen pour savoir si l'élement de displayIndex correspond au currentIndex
            const isCurrent = index === currentIndex;
            return (
              <li
                className={`list-container ${isCurrent ? "current" : ""}`}
                key={pokemon.id}
              >
                {/* Si c'est le Pokémon actuel, on crée un lien vers la page du
                  Pokémon */}
                {isCurrent ? (
                  <NavLink
                    to={`/pokemon/${dataPoke[index].id}`}
                    className="navlink-accueil"
                  >
                    <div className="pokeballImg">
                      <img src={pokeballColor} alt="pokeball" />
                    </div>
                    <p className="name-accueil">{pokemon.name}</p>
                  </NavLink>
                ) : (
                  // Si ce n'est pas le Pokémon avec le currentIndex, on affiche juste son nom
                  <div>
                    <div className="pokeballImg"></div>
                    <p className="name-accueil">{pokemon.name}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Accueil;

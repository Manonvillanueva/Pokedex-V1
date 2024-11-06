import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/detail.css";
import desc from "../json/description.json";
import gradients from "../json/gradients.json";
import arrow from "../img/arrow.png";
import Star from "../Components/Star";

// Réception des données de l'API via dataPoke
const Detail = ({ dataPoke }) => {
  // Initialisation de useNavigate pour gérer la navigation
  //  Pour le bouton retour sur la page détail
  const navigate = useNavigate();

  // Récupère les paramètres de l'URL gràce à useParam();
  // Ici nn récupère l'ID qui est affiché dans l'URL
  const { id } = useParams();

  // Cherche le Pokémon avec l'id du Pokémon qui correspond à l'id passé dans l'URL (converti en nombre)
  const foundPokemon = dataPoke.find((element) => element.id === parseInt(id));
  if (!foundPokemon) return null;

  // Stocke la description du Pokémon en fonction de son ID
  // Recherche dans le fichier JSON description
  const foundDescription = desc.find((des) => des.id === foundPokemon.id);

  // Fonction pour gérer le retour à la page précédente
  const handleClick = () => {
    navigate(-1);
  };

  // Fonction pour changer le style de la liste des types
  // gradients correspond au fichier JSON gradients
  // Cette expression cherche le type de Pokémon dans l'objet gradients
  // Par exemple, pour type.name = "acier", cela correspond à gradients["acier"].
  const typeStyle = (type) => {
    return {
      background: gradients[type.name.toLowerCase()]?.[0] || "transparent",
      border: `2px solid ${gradients[type.name.toLowerCase()]?.[1] || "red"}`,
    };
  };

  // Définition des statistiques du Pokémon dans un tableau d'objet pour éviter de l'écrire plusieurs fois
  // (avec les labels, les valeurs actuelles et les valeurs maximales)
  //  Afin de générer la ProgressBar
  const stats = [
    { label: "PV", now: foundPokemon.stats.HP, max: 250 },
    { label: "Attaque", now: foundPokemon.stats.attack, max: 130 },
    { label: "Défense", now: foundPokemon.stats.defense, max: 230 },
    {
      label: "Attaque Spéciale",
      now: foundPokemon.stats.special_attack,
      max: 135,
    },
    {
      label: "Défense Spéciale",
      now: foundPokemon.stats.special_defense,
      max: 230,
    },
    { label: "Vitesse", now: foundPokemon.stats.speed, max: 140 },
  ];
  return (
    <div className="detail-container">
      {/* LEFT PART - FLECHE RETOUR  */}
      <div className="left-detail">
        <button onClick={handleClick} className="return">
          <img src={arrow} alt="flèche retour" />
        </button>
      </div>

      {/* CENTER PART - IMG ET TYPES DU POKEMON  */}
      <div className="center-detail">
        {/*Nom du Pokémon et du composant Star (pour l'ajouter aux favoris) */}
        <h3>
          {foundPokemon.name}
          <Star foundPokemon={foundPokemon} />
        </h3>
        {/*Image du Pokémon */}
        <div className="absolute">
          <img
            className="img-detail"
            src={foundPokemon.image}
            alt={foundPokemon.name}
          />
          {/* Cercle en dessous du Pokémon pour un effet visuel  */}
          <span className="circle"></span>
        </div>
        {/* Liste des types du Pokémon */}
        <ul className="ul-types">
          {/* On parcourt chaque type du Pokémon avec map pour afficher les types sous forme de liste */}
          {foundPokemon.apiTypes.map((type) => {
            return (
              // Changement du background et de la border avec la fonction typeStyle
              <li key={type.name} style={typeStyle(type)}>
                {type.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT PART - DESCRIPTION ET STAT DU POKEMON */}
      <div className="right-detail">
        {/* Description du Pokémon  */}
        <span>Description :</span>
        <p className="description-detail">{foundDescription.description}</p>
        {/* Affichage des statistiques du Pokémon sous forme de barre de progression via Bootstrap */}
        <div className="stat-pokemon">
          {stats.map((stat) => {
            return (
              <div key={stat.label}>
                <span>{`${stat.label}:`}</span>
                <ProgressBar
                  now={stat.now}
                  max={stat.max}
                  className="custom-progress"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;

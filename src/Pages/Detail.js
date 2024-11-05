import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/detail.css";
import desc from "../json/description.json";
import gradients from "../json/gradients.json";
import arrow from "../img/arrow.png";
import Star from "../Components/Star";

const Detail = ({ dataPoke }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const foundPokemon = dataPoke.find((p) => p.id === parseInt(id));
  if (!foundPokemon) return null;

  const foundDescription = desc.find((des) => des.id === foundPokemon.id);

  // Fonction pour gérer le retour à la page précédente
  const handleClick = () => {
    navigate(-1);
  };

  // Fonction pour changer le style de la liste des types
  const typeStyle = (type) => {
    return {
      background: gradients[type.name.toLowerCase()]?.[0] || "transparent",
      border: `2px solid ${gradients[type.name.toLowerCase()]?.[1] || "red"}`,
    };
  };

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
      <div className="left-detail">
        <button onClick={handleClick} className="return">
          <img src={arrow} alt="flèche retour" />
        </button>
      </div>
      <div className="center-detail">
        <h3>
          {foundPokemon.name}
          <Star foundPokemon={foundPokemon} />
        </h3>
        <div className="absolute">
          <img
            className="img-detail"
            src={foundPokemon.image}
            alt={foundPokemon.name}
          />
          <span className="circle"></span>
        </div>
        <ul className="ul-types">
          {foundPokemon.apiTypes.map((type, index) => {
            return (
              <li key={`${type.name}-${index}`} style={typeStyle(type)}>
                {type.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="right-detail">
        <span>Description :</span>
        <p className="description-detail">{foundDescription.description}</p>
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

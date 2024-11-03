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

  const handleClick = () => {
    navigate(-1);
  };

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
            console.log(type.name.toLowerCase());
            return (
              <li
                key={`${type.name}-${index}`}
                style={{
                  background:
                    gradients[type.name.toLowerCase()]?.[0] || "transparent",
                  border: `2px solid ${
                    gradients[type.name.toLowerCase()]?.[1] || "red"
                  }`,
                }}
              >
                {type.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="right-detail">
        <p className="description-detail">
          <span>Description</span>
          {foundDescription.description}
        </p>
        <div className="stat-pokemon">
          <div>
            <span>PV:</span>
            <ProgressBar
              now={foundPokemon.stats.HP}
              max={250}
              className="custom-progress"
            />
          </div>
          <div>
            <span>Attaque:</span>
            <ProgressBar
              now={foundPokemon.stats.attack}
              max={130}
              className="custom-progress"
            />
          </div>
          <div>
            <span>Défense:</span>
            <ProgressBar
              now={foundPokemon.stats.defense}
              max={230}
              className="custom-progress"
            />
          </div>
          <div>
            <span>Attaque spéciale:</span>
            <ProgressBar
              now={foundPokemon.stats.special_attack}
              max={135}
              className="custom-progress"
            />
          </div>
          <div>
            <span>Défense spéciale:</span>
            <ProgressBar
              now={foundPokemon.stats.special_defense}
              max={230}
              className="custom-progress"
            />
          </div>
          <div>
            <span>Vitesse:</span>
            <ProgressBar
              now={foundPokemon.stats.speed}
              max={140}
              className="custom-progress"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

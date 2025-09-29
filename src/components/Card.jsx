import { useState } from "react";
import { CARD_STATUS } from "../utils/game-constants";
import "./styles/Card.css";

function Card({ pokemon, handleClickCard, selectedIds, status, isFlipped }) {
  // Manage correct/incorrect click animation
  const [clickResult, setClickResult] = useState(null);

  function onClick() {
    if (status !== CARD_STATUS.ACTIVE) return;
    selectedIds.includes(pokemon.id)
      ? setClickResult("animate-" + CARD_STATUS.INCORRECT)
      : setClickResult("animate-" + CARD_STATUS.CORRECT);
    setTimeout(() => {
      handleClickCard(pokemon.id);
      setClickResult(null);
    }, 800);
  }

  function getCardClasses() {
    return (
      "card" +
      (status ? " " + status : "") +
      (isFlipped ? " flipped" : "") +
      (clickResult ? " " + clickResult : "")
    );
  }

  return (
    <div className="card-wrapper">
      <div className={getCardClasses()} onClick={onClick}>
        <div className="card-front pixel-border-inner">
          <img src={pokemon.url} alt={pokemon.name} />
          <span>{pokemon.name}</span>
        </div>
        <div className="card-back">
          <img src="/assets/images/card_back.png" alt="card back" />
        </div>
      </div>
    </div>
  );
}

export default Card;

import { useState } from "react";
import { CARD_STATUS } from "../utils/game-constants";
import Card from "./Card";
import "./styles/Board.css";

function Board({
  pokemonList,
  difficulty,
  handleSelectPokemon,
  isGameStart,
  isGameOver,
  selectedIds,
  incorrectSelectedId,
}) {
  // Manage animations
  const [isFlipped, setIsFlipped] = useState(false);
  // Manage board interactivity during animations
  const [isActive, setIsActive] = useState(true);

  function getCardStatus(id) {
    if (!isGameStart) return CARD_STATUS.NONE;
    if (!isActive && !isGameOver) return CARD_STATUS.NONE;
    if (!isGameOver) return CARD_STATUS.ACTIVE;
    if (selectedIds.length === difficulty.cards) return CARD_STATUS.CORRECT;
    if (id === incorrectSelectedId) return CARD_STATUS.INCORRECT;
    if (selectedIds.includes(id)) return CARD_STATUS.CORRECT;
    return CARD_STATUS.NONE;
  }

  function handleClickCard(id) {
    if (isGameOver) return;
    setIsFlipped(true);
    setIsActive(false);
    // wait for flip -> shuffle pokemon
    setTimeout(() => {
      handleSelectPokemon(id);
      setIsFlipped(false);
    }, 400);
    // wait for second flip -> reactivate board
    setTimeout(() => {
      setIsActive(true);
    }, 600);
  }

  return (
    <div className="board pixel-border-inner">
      {pokemonList.map((pokemon, idx) => (
        <Card
          key={idx}
          pokemon={pokemon}
          handleClickCard={handleClickCard}
          selectedIds={selectedIds}
          status={getCardStatus(pokemon.id)}
          isFlipped={isFlipped || !isGameStart}
        />
      ))}
    </div>
  );
}

export default Board;

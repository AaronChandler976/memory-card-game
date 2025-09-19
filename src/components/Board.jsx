import { NUM_CARDS, CARD_STATUS } from "../utils/game-constants";
import Card from "./Card";

function Board({ pokemonList, handleClickCard, isGameOver, selectedIds }) {
  function getCardStatus(id) {
    if (!isGameOver) return CARD_STATUS.NONE;
    if (selectedIds.length === NUM_CARDS) return CARD_STATUS.CORRECT;
    if (id === selectedIds.at(-1)) return CARD_STATUS.INCORRECT;
    if (selectedIds.includes(id)) return CARD_STATUS.CORRECT;
    return CARD_STATUS.NONE;
  }

  return (
    <div className="board">
      {pokemonList.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          handleClickCard={handleClickCard}
          status={getCardStatus(pokemon.id)}
        />
      ))}
    </div>
  );
}

export default Board;

import Card from "./Card";

function Board({ pokemonList, handleClickCard }) {
  return (
    <div class="board">
      {pokemonList.map((pokemon) => {
        <Card pokemon={pokemon} handleClickCard={handleClickCard} />;
      })}
    </div>
  );
}

export default Board;

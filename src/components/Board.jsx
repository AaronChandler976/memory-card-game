import Card from "./Card";

function Board({ pokemonList, handleClickCard }) {
  return (
    <div className="board">
      {pokemonList.map((pokemon) => (
        <Card
          pokemon={pokemon}
          key={pokemon.id}
          handleClickCard={handleClickCard}
        />
      ))}
    </div>
  );
}

export default Board;

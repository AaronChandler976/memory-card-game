import { useEffect, useState } from "react";
import Card from "./Card";

function Board() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    function fetchPokemon() {}
    setPokemonList(fetchPokemon());
  }, []);

  function clickCard() {}

  return (
    <div class="board">
      {pokemonList.map((pokemon) => {
        <Card pokemon={pokemon} clickCard={clickCard} />;
      })}
    </div>
  );
}

export default Board;

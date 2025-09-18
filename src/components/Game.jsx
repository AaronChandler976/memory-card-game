import { useState, useEffect } from "react";
import Board from "./Board";
import Score from "./Score";
import Loading from "./Loading";
import { NUM_CARDS } from "../utils/game-rules";
import { getNewRandomId } from "../utils/utils";

function Game() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setPokemonList(getPokemonList());
    setIsLoading(false);
  }, []);

  function handleClickCard(selectedId) {
    if (!isGameOver) return;
    if (selectedIds.includes(selectedId)) {
      setIsGameOver(true);
      return;
    }
    const newSelectedIds = [...selectedIds, selectedId];
    setSelectedIds(newSelectedIds);
  }

  function handleClickNewGame() {
    setPokemonList(getPokemonList());
    setSelectedIds([]);
    setIsGameOver(false);
  }

  function getPokemonList() {
    let newPokemonList = [];
    async function getPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${getNewRandomId(newPokemonList)}/`
        );
        if (!response.ok) {
          throw new Error(`Error getting pokemon. Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    while (newPokemonList.length < NUM_CARDS) {
      const pokemon = getPokemon();
      if (pokemon) newPokemonList.push(pokemon);
    }
    return newPokemonList;
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Board pokemonList={pokemonList} handleClickCard={handleClickCard} />
      )}
      <div className="sidebar">
        <Score score={selectedIds.length} />
        {isGameOver && <button onClick={handleClickNewGame}>New Game</button>}
      </div>
    </div>
  );
}

export default Game;

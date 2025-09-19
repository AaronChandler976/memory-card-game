import { useState, useEffect } from "react";
import Board from "./Board";
import Score from "./Score";
import Loading from "./Loading";
import { NUM_CARDS, API_BASE_URL } from "../utils/game-constants";
import { getNewPokemonId } from "../utils/utils";
import "./styles/Game.css";

function Game() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const newPokemonList = await fetchPokemon();
      if (!ignore) {
        setPokemonList(newPokemonList);
        setIsLoading(false);
      }
    }
    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  function handleClickCard(selectedId) {
    if (isGameOver) return;
    if (selectedIds.includes(selectedId)) {
      setIsGameOver(true);
      return;
    }
    const newSelectedIds = [...selectedIds, selectedId];
    setSelectedIds(newSelectedIds);
  }

  function handleClickNewGame() {
    setIsLoading(true);
    async function startFetching() {
      const newPokemonList = await fetchPokemon();
      setPokemonList(newPokemonList);
      setIsLoading(false);
    }
    startFetching();
    setSelectedIds([]);
    setIsGameOver(false);
  }

  async function fetchPokemon() {
    const newPokemonIds = [];
    while (newPokemonIds.length < NUM_CARDS) {
      const newId = getNewPokemonId(newPokemonIds);
      newPokemonIds.push(newId);
    }
    const newPokemonList = await Promise.all(
      newPokemonIds.map(async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const responseJson = await response.json();
        const newPokemon = {
          id: responseJson.id,
          name: responseJson.name,
          url: responseJson.sprites.front_default,
        };
        return newPokemon;
      })
    );
    return newPokemonList;
  };

  return (
    <div className="game">
      {isLoading ? (
        <Loading />
      ) : (
        <Board
          pokemonList={pokemonList}
          handleClickCard={handleClickCard}
          isGameOver={isGameOver}
          selectedIds={selectedIds}
        />
      )}
      <div className="sidebar">
        <Score score={selectedIds.length} />
        {isGameOver && <button onClick={handleClickNewGame}>New Game</button>}
      </div>
    </div>
  );
}

export default Game;

import { useState, useEffect } from "react";
import Board from "./Board";
import Score from "./Score";
import Loading from "./Loading";
import { NUM_CARDS, API_BASE_URL } from "../utils/game-constants";
import { getNewPokemonId, shuffleArray } from "../utils/utils";
import "./styles/Game.css";

function Game() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [wrongSelectionId, setWrongSelectionId] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

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
      setWrongSelectionId(selectedId);
      return;
    }
    const newSelectedIds = [...selectedIds, selectedId];
    setSelectedIds(newSelectedIds);
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);
    shufflePokemon();
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
    setWrongSelectionId(null);
    setCurrentStreak(0);
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
          name: responseJson.name.split("-")[0],
          url: responseJson.sprites.front_default,
        };
        return newPokemon;
      })
    );
    return newPokemonList;
  }

  function shufflePokemon() {
    const shuffledPokemon = shuffleArray(pokemonList);
    setPokemonList(shuffledPokemon);
  }

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
          wrongSelectionId={wrongSelectionId}
        />
      )}
      <div className="sidebar">
        <Score
          score={selectedIds.length}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
        />
        {isGameOver && <button onClick={handleClickNewGame}>New Game</button>}
      </div>
    </div>
  );
}

export default Game;

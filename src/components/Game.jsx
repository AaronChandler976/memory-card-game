import { useState, useEffect } from "react";
import Board from "./Board";
import Score from "./Score";
import Loading from "./Loading";
import { API_BASE_URL, DIFFICULTY } from "../utils/game-constants";
import { getNewPokemonId, shuffleArray } from "../utils/utils";
import "./styles/Game.css";
import Button from "./Button";
import Difficulty from "./Difficulty";

const initDifficulty = DIFFICULTY[Object.keys(DIFFICULTY)[1]];

const initHighScores = Object.keys(DIFFICULTY)
  .map((d) => DIFFICULTY[d].name)
  .reduce((acc, name) => {
    acc[name] = 0;
    return acc;
  }, {});

function Game() {
  const [fetchedPokemon, setFetchedPokemon] = useState([]);
  const [difficulty, setDifficulty] = useState(initDifficulty);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameStart, setIsGameStart] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [incorrectSelectedId, setIncorrectSelectedId] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highScore, setHighScore] = useState(initHighScores);

  const isGameOver =
    incorrectSelectedId !== null || selectedIds.length === difficulty.cards;
  const isWon =
    incorrectSelectedId === null && selectedIds.length === difficulty.cards;

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const newPokemonList = await fetchPokemon();
      if (!ignore) {
        setFetchedPokemon(newPokemonList);
        setPokemonList(newPokemonList.slice(0, difficulty.cards));
        setIsLoading(false);
      }
    }
    startFetching();

    return () => {
      ignore = true;
    };
  }, []);

  async function fetchPokemon() {
    const newPokemonIds = [];
    const maxCards =
      DIFFICULTY[Object.keys(DIFFICULTY)[Object.keys(DIFFICULTY).length - 1]]
        .cards;
    while (newPokemonIds.length < maxCards) {
      const newId = getNewPokemonId(newPokemonIds);
      newPokemonIds.push(newId);
    }
    const newPokemonList = await Promise.all(
      newPokemonIds.map(async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const responseJson = await response.json();
        const newPokemon = {
          id: responseJson.id,
          name: responseJson.species.name,
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

  function sortPokemonListByStatus(incorrectId) {
    if (selectedIds.length === difficulty.cards) return pokemonList;
    const correctSelectionIds = selectedIds.filter((id) => id !== incorrectId);
    const incorrectPokemon = pokemonList.filter((p) => p.id === incorrectId);
    const correctPokemon = pokemonList.filter((p) =>
      correctSelectionIds.includes(p.id)
    );
    const unselectedPokemon = pokemonList.filter(
      (p) => !selectedIds.includes(p.id)
    );
    const sortedArr = [].concat(
      incorrectPokemon,
      correctPokemon,
      unselectedPokemon
    );
    setPokemonList(sortedArr);
  }

  function handleSelectPokemon(id) {
    if (isGameOver) return;

    if (selectedIds.includes(id)) {
      setIncorrectSelectedId(id);
      sortPokemonListByStatus(id);
      return;
    }

    const newSelectedIds = [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    if (newStreak > highScore[difficulty.name]) {
      const newHighScore = { ...highScore, [difficulty.name]: newStreak };
      setHighScore(newHighScore);
    }
    shufflePokemon();
  }

  function resetGame() {
    setIsLoading(true);
    async function startFetching() {
      const newPokemonList = await fetchPokemon();
      setPokemonList(newPokemonList);
      setPokemonList(newPokemonList.slice(0, difficulty.cards));
      setIsLoading(false);
    }
    startFetching();
    setSelectedIds([]);
    setIncorrectSelectedId(null);
  }

  function handleStartGame() {
    setIsGameStart(true);
  }

  function handleNewGame() {
    resetGame();
    setCurrentStreak(0);
    setIsGameStart(false);
  }

  function handleContinueGame() {
    resetGame();
  }

  function handleSelectDifficulty(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setPokemonList(fetchedPokemon.slice(0, selectedDifficulty.cards));
  }

  return (
    <div className="pixel-border-outer">
      <div className="game pixel-border-middle">
        {isLoading ? (
          <Loading difficulty={difficulty} />
        ) : (
          <Board
            pokemonList={pokemonList.slice(0, difficulty.cards)}
            difficulty={difficulty}
            handleSelectPokemon={handleSelectPokemon}
            isGameStart={isGameStart}
            isGameOver={isGameOver}
            selectedIds={selectedIds}
            incorrectSelectedId={incorrectSelectedId}
          />
        )}
        <div className="sidebar pixel-border-inner">
          <div className="game-controls-wrapper">
            <Score
              score={isGameStart ? selectedIds.length : "-"}
              difficulty={difficulty}
              currentStreak={isGameStart ? currentStreak : "-"}
              highScore={highScore}
            />
            {!isGameStart && (
              <Button text={"Start Game"} handleClick={handleStartGame} />
            )}
            {!isGameStart && (
              <Difficulty
                difficulty={difficulty}
                handleSelectDifficulty={handleSelectDifficulty}
              />
            )}
            {isGameOver && (
              <div className="game-over-wrapper">
                {isWon && (
                  <Button text={"Continue"} handleClick={handleContinueGame} />
                )}
                {isGameOver && (
                  <Button text={"New Game"} handleClick={handleNewGame} />
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Game;

import { MAX_ID } from "./game-constants";

function getNewPokemonId(excludeIdsList) {
  let newId;
  do {
    newId = Math.floor(Math.random() * MAX_ID) + 1;
  } while (excludeIdsList.some((id) => newId === id));
  return newId;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { getNewPokemonId, shuffleArray };

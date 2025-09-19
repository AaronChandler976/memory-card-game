import { MAX_ID } from "./game-constants";

function getNewPokemonId(excludeIdsList) {
  let newId;
  do {
    newId = Math.floor(Math.random() * MAX_ID) + 1;
  } while (excludeIdsList.some((id) => newId === id));
  return newId;
}

export { getNewPokemonId };

import { MAX_ID } from "./game-rules";

function getNewRandomId(pokemonList) {
  let id;
  do {
    id = Math.floor(Math.random() * MAX_ID);
  } while (pokemonList.some((pokemon) => id === pokemon.id));
  return id;
}

export { getNewRandomId };

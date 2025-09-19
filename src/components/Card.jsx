import { CARD_STATUS } from "../utils/game-constants";
import "./styles/Card.css";

function Card({ pokemon, handleClickCard, status }) {
  console.log(status);
  return (
    <div
      className={"card" + (status === CARD_STATUS.NONE ? "" : " " + status)}
      onClick={() => handleClickCard(pokemon.id)}
    >
      <img src={pokemon.url} alt={pokemon.name} />
      <span>{pokemon.name}</span>
    </div>
  );
}

export default Card;

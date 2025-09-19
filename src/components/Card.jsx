import "./styles/Card.css";

function Card({ pokemon, handleClickCard }) {
  return (
    <div className="card" onClick={() => handleClickCard(pokemon.id)}>
      <img src={pokemon.url} alt={pokemon.name} />
      <span>{pokemon.name}</span>
    </div>
  );
}

export default Card;

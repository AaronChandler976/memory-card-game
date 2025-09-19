function Card({ pokemon, handleClickCard }) {
  return (
    <div className="card" onClick={() => handleClickCard(pokemon.id)}>
      <img src={pokemon.url} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default Card;

function Card({ pokemon, clickCard }) {
  return (
    <div class="card" onclick={clickCard}>
      <img src={pokemon.url} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default Card;

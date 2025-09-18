function Card({ pokemon, handleClickCard }) {
  const imageUrl = pokemon.sprites.front_default;

  return (
    <div class="card" onclick={() => handleClickCard(pokemon.id)}>
      <img src={imageUrl} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default Card;

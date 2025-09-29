import PokemonLogo from "/assets/images/International_Pokémon_logo.svg";
import "./styles/Header.css";

function Header() {
  return (
    <header className="header">
      <span className="logo">
        <img src={PokemonLogo} alt="Pokemon logo" className="logo-image" />
        <h1>Memory Card Game</h1>
      </span>
    </header>
  );
}

export default Header;

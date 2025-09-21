import "./styles/App.css";
import Game from "../components/Game";
import Header from "../components/Header";
import Background from "../components/Background";

function App() {
  return (
    <div className="app">
      <Background />
      <Header />
      <Game />
    </div>
  );
}

export default App;

import { DIFFICULTY } from "../utils/game-constants";
import "./styles/Difficulty.css";

function Difficulty({ difficulty, handleSelectDifficulty }) {
  return (
    <div className="difficulty-wrapper">
      {Object.keys(DIFFICULTY).map((key) => (
        <div
          key={key}
          className={
            "difficulty-selector" +
            (DIFFICULTY[key] === difficulty ? " selected" : "")
          }
          onClick={() => handleSelectDifficulty(DIFFICULTY[key])}
        >
          <div className="checkbox" />
          <span>{DIFFICULTY[key].name}</span>
        </div>
      ))}
    </div>
  );
}

export default Difficulty;

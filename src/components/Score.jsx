import { NUM_CARDS } from "../utils/game-constants";
import "./styles/Score.css";

function Score({ score }) {
  const numCards = NUM_CARDS;

  return (
    <div className="score">
      <div className="score-display">
        <span>
          {score}/{numCards}
        </span>
      </div>
      <div className="score-info">
        <span>Current Streak: </span>
        <span>Best: </span>
      </div>
    </div>
  );
}

export default Score;

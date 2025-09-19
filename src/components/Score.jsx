import { NUM_CARDS } from "../utils/game-constants";
import "./styles/Score.css";

function Score({ score, currentStreak, bestStreak }) {
  const numCards = NUM_CARDS;

  return (
    <div className="score">
      <div className="score-display">
        <span>
          {score}/{numCards}
        </span>
      </div>
      <div className="score-info">
        <span>Score: {currentStreak}</span>
        <span>Highscore: {bestStreak}</span>
      </div>
    </div>
  );
}

export default Score;

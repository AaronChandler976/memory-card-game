import "./styles/Score.css";

function Score({ score, difficulty, currentStreak, highScore }) {
  return (
    <div className="score">
      <div className="score-display pixel-border-inner">
        <span>
          {score}/{difficulty.cards}
        </span>
      </div>
      <div className="score-info">
        <span>Streak: {currentStreak}</span>
        <span>Highscore: {highScore[difficulty.name]}</span>
      </div>
    </div>
  );
}

export default Score;

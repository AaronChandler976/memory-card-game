import { NUM_CARDS } from "../utils/game-rules";

function Score({ score }) {
  const numCards = NUM_CARDS;

  return (
    <h2 className="score">
      Score: {score}/{numCards}
    </h2>
  );
}

export default Score;

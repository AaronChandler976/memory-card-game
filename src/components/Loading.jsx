import "./styles/Loading.css";

function Loading({ difficulty }) {
  return (
    <div
      className={"loading pixel-border-inner" + ` difficulty-${difficulty.level}`}
    >
      Loading...
    </div>
  );
}

export default Loading;

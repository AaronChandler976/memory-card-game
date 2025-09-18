import { BoardSizes as sizes } from "../utils/game-rules";

function SizeSelector({ handleSelectSize }) {
  return (
    <div class="selector-container">
      {sizes.map((size) => {
        <div
          class="selector-option"
          key={size.value}
          onClick={() => handleSelectSize(size.value)}
        >
          {size.name}
        </div>;
      })}
    </div>
  );
}

export default SizeSelector;

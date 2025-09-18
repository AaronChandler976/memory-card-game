function Launcher({
  handleClickStart,
  handleClickRandomize,
  handleSelectSize,
}) {
  return (
    <>
      <button onClick={handleClickStart}></button>
      <button onClick={handleClickRandomize}></button>
      <SizeSelector handleSelectSize={handleSelectSize} />
    </>
  );
}

export default Launcher;

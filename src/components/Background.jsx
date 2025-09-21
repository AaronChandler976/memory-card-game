import "./styles/Background.css";

function Background() {
  return (
    <div
      className="background-video"
      dangerouslySetInnerHTML={{
        __html: `
        <video muted="muted" autoplay loop>
        <source
        src="./src/assets/video/Horizon_Slow_Wide.mp4"
        type="video/mp4"
        />
        </video>
        `,
      }}
    />
  );
}

export default Background;

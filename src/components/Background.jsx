import "./styles/Background.css";

function Background() {
  return (
    <div
      className="background-video"
      dangerouslySetInnerHTML={{
        __html: `
        <video muted="muted" autoplay loop>
        <source
        src="/assets/video/Horizon_Bike_Background.mp4"
        type="video/mp4"
        />
        </video>
        `,
      }}
    />
  );
}

export default Background;

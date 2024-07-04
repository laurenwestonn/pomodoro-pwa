import "../styles/PomodoroButton.css";

interface CircleButtonInterface {
  onClick: () => void;
  name: string;
  imagePath: string;
}

const CircleButton = (props: CircleButtonInterface) => {
  return (
    <button
      className="circle-button"
      aria-label={props.name}
      style={{
        backgroundImage: `url(${props.imagePath})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
        backgroundSize: "70%"
      }}
      onClick={props.onClick}
    ></button>
  );
};

export default CircleButton;

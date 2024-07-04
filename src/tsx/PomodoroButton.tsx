import "../styles/PomodoroButton.css";

interface PomodoroButtonInterface {
  onClick: () => void;
  text: JSX.Element;
  name: string;
}

const PomodoroButton = (props: PomodoroButtonInterface) => {
  return (
    <button
      className={"pomodoro-button pomodoro-button__" + props.name}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default PomodoroButton;

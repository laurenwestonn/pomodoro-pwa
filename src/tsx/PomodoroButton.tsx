import "../styles/PomodoroButton.css";

interface PomodoroButtonInterface {
  onClick: () => void;
  text: JSX.Element;
  name: string;
  hasOverran?: boolean;
}

const PomodoroButton: React.FC<PomodoroButtonInterface> = ({
  onClick,
  text,
  name,
  hasOverran
}) => {
  let className = "pomodoro-button pomodoro-button__" + name;
  if (hasOverran) {
    className += " pomodoro-button__overran";
  }
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default PomodoroButton;

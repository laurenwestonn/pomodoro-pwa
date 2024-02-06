import '../styles/PomodoroButton.css';

interface PomodoroButtonInterface {
  onClick: () => void,
  isRunning: boolean,
}

const PomodoroButton = (props: PomodoroButtonInterface) => {


  return (
    <button
      className="pomodoro-button"
      onClick={props.onClick}>{props.isRunning ? 'Stop' : 'Start'}
    </button>
  )
}

export default PomodoroButton;
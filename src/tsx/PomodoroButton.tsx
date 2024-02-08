import '../styles/PomodoroButton.css';
import {State} from '../App';

interface PomodoroButtonInterface {
  state: State,
  setState: (state: State) => void,
  time: number,
  setTime: (time: number) => void,
  history: number[],
  setHistory: (time: number[]) => void
}

const formatTime = (time: number) => {
  const absTime = Math.abs(time);
  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = Math.floor(absTime % 60);

  if (time >= 0) {
    return (
      <>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </>
    );
  } else {
    return (
      <>
        - {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </>
    );

  }
};

const calcBreak = (time: number) => {
  return Math.floor(time / 5);
}

const PomodoroButton = (props: PomodoroButtonInterface) => {

  if (props.state === State.initial) {
    return (
      <button
        className="pomodoro-button pomodoro-button__initial"
        onClick={() => props.setState(State.focus)}>
          Start
      </button>
    )
  } else if (props.state === State.focus) {
    return (
      <button
        className="pomodoro-button pomodoro-button__focus"
        onClick={() => {
          props.setState(State.break);
          props.setHistory([...props.history, props.time])
          props.setTime(calcBreak(props.time));
        }}>
          <p>{formatTime(props.time)}</p>
          <p>Tap for a break</p>
      </button>
    )
  } else if (props.state === State.break) {
    return (
      <button
        className="pomodoro-button pomodoro-button__break"
        onClick={() => {
          props.setState(State.focus);
          const recommendedBreak = calcBreak(props.history[props.history.length-1]);
          console.log('recommended break was ' + recommendedBreak + ", minus current time " + props.time + " = " + (recommendedBreak - props.time));
          props.setHistory([...props.history, recommendedBreak - props.time])
          props.setTime(0);
        }}>
          <p>Back to it in...</p>
          <p>{formatTime(props.time)}</p>
      </button>
    )
  }
  return (<div>don't show pomo button</div>)
}

export default PomodoroButton;
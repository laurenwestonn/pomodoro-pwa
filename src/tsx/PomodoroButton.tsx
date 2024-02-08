import '../styles/PomodoroButton.css';
import {State, formatTime} from '../App';

interface PomodoroButtonInterface {
  state: State,
  setState: (state: State) => void,
  time: number,
  setTime: (time: number) => void,
  history: number[],
  setHistory: (time: number[]) => void
}

const calcBreak = (time: number) => {
  return Math.floor(time / 5);
}

const PomodoroButton = (props: PomodoroButtonInterface) => {

  if (props.state === State.initial) {
    return (
      <button
        className="pomodoro-button pomodoro-button__initial"
        onClick={() => props.setState(State.focus)}>
          <p>Start</p>
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
          <p><span>{formatTime(props.time)}</span><br />Tap for a break</p>
      </button>
    )
  } else if (props.state === State.break) {
    return (
      <button
        className="pomodoro-button pomodoro-button__break"
        onClick={() => {
          props.setState(State.focus);
          const recommendedBreak = calcBreak(props.history[props.history.length-1]);
          props.setHistory([...props.history, recommendedBreak - props.time])
          props.setTime(0);
        }}>
          <p>Back to it in...<br /><span>{formatTime(props.time)}</span></p>
      </button>
    )
  }

  return null;
}

export default PomodoroButton;
import '../styles/PomodoroButton.css';
import {State, formatTime} from '../App';
import ResultsPage from './ResultsPage';

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
      <ResultsPage
          setState={props.setState}
          history={props.history}
          setHistory={props.setHistory}
          time={props.time}
          setTime={props.setTime} />
    )
  }

  return null;
}

export default PomodoroButton;
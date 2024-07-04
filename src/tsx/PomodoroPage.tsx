import "../styles/PomodoroButton.css";
import { State, formatTime } from "../App";
import PomodoroButton from "./PomodoroButton";

interface PomodoroPageInterface {
  state: State;
  setState: (state: State) => void;
  time: number;
  setTime: (time: number) => void;
  history: number[];
  setHistory: (time: number[]) => void;
}

const calcBreak = (time: number) => {
  return Math.floor(time / 5);
};

const PomodoroPage = (props: PomodoroPageInterface) => {
  if (props.state === State.initial) {
    return (
      <PomodoroButton
        onClick={() => props.setState(State.focus)}
        text={<p>Start</p>}
        name={"initial"}
      />
    );
  } else if (props.state === State.focus) {
    return (
      <PomodoroButton
        onClick={() => {
          props.setState(State.break);
          props.setHistory([...props.history, props.time]);
          props.setTime(calcBreak(props.time));
        }}
        text={
          <p>
            <span>{formatTime(props.time)}</span>
            <br />
            Tap for a break
          </p>
        }
        name={"focus"}
        hasOverran={props.time < 0}
      />
    );
  } else if (props.state === State.break) {
    return (
      <PomodoroButton
        onClick={() => {
          props.setState(State.focus);
          const recommendedBreak = calcBreak(
            props.history[props.history.length - 1]
          );
          props.setHistory([...props.history, recommendedBreak - props.time]);
          props.setTime(0);
        }}
        text={
          <p>
            Back to it in...
            <br />
            <span>{formatTime(props.time)}</span>
          </p>
        }
        name={"break"}
        hasOverran={props.time < 0}
      />
    );
  }

  return null;
};

export default PomodoroPage;

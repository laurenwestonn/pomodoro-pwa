import '../styles/ResultsPage.css';
import {State, formatTime} from '../App';

interface ResultsPageInterface {
  setState: (state: State) => void,
  time: number,
  setTime: (time: number) => void,
  history: number[],
  setHistory: (time: number[]) => void
}

const calcBreak = (time: number) => {
  return Math.floor(time / 5);
}

const ResultsPage = (props: ResultsPageInterface) => {
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

export default ResultsPage;
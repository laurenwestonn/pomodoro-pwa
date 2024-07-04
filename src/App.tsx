import reset from "./img/reset.png";
import finish from "./img/finish.png";
import "./Common.css";
import PomodoroPage from "./tsx/PomodoroPage";
import { useEffect, useState } from "react";
import ResultsPage from "./tsx/ResultsPage";
import CircleButton from "./tsx/CircleButton";

export enum State {
  initial,
  focus,
  break,
  results
}

export const formatTime = (time: number) => {
  const absTime = Math.abs(time);
  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;

  return (
    <>
      {time < 0 ? "-" : ""}
      {hours}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </>
  );
};

function App() {
  const [state, setState] = useState(State.initial);
  const [history, setHistory] = useState<number[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (state === State.focus) {
      // incrementing time by 1 every second
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    if (state === State.break) {
      // decrease time by 1 every second
      intervalId = setInterval(() => setTime(time - 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [state, time]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <h3>state: {State[state]}</h3>
        <h3>history: {history.length === 0 ? "empty" : history.join()}</h3>
        <h3>time: {time}</h3> */}

        <PomodoroPage
          state={state}
          setState={setState}
          history={history}
          setHistory={setHistory}
          time={time}
          setTime={setTime}
        />

        {state === State.results && (
          <ResultsPage history={history} setHistory={setHistory} time={time} />
        )}

        {(state === State.focus ||
          state === State.break ||
          state === State.results) && (
          <CircleButton
            name="reset"
            onClick={() => {
              setState(State.initial);
              setHistory([]);
              setTime(0);
            }}
            imagePath={reset}
          />
        )}

        {(state === State.focus || state === State.break) && (
          <CircleButton
            name="finish"
            onClick={() => {
              setState(State.results);
              setHistory([...history, time]);
            }}
            imagePath={finish}
          />
        )}
      </header>
    </div>
  );
}

export default App;

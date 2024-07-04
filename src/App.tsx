import reset from './img/reset.png';
import finish from './img/finish.png';
import './Common.css';
import PomodoroButton from './tsx/PomodoroButton';
import { useEffect, useState } from 'react';

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

const formatTimeSimple = (time: number) => {
  const absTime = Math.abs(time);
  if (absTime < 60) {
    return `${absTime}s`
  } else {
    if (absTime < 3600) {
      return `${Math.floor(absTime / 60)}m ${Math.floor(absTime % 60)}s`
    }
  }

  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;

  return (
    <>
      {time >= 0 ? "-" : ""} {hours}hr {minutes.toString().padStart(2, "0")}m {seconds.toString().padStart(2, "0")}s
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

        <PomodoroButton
          state={state}
          setState={setState}
          history={history}
          setHistory={setHistory}
          time={time}
          setTime={setTime}
        />

        {(
          state === State.results
        ) && (
          <>
            <h1>Results</h1>
            {history.map((time, i) => (
              <p key={i} className={i % 2 === 0 ? "time__focus" : "time__break"}>
                {formatTimeSimple(time)}
              </p>
            ))}
          </>
        )}

        {(
          state === State.focus ||
          state === State.break ||
          state === State.results
        ) && (
          <button
            className="circle-button"
            aria-label="reset"
            // style={{backgroundImage: logo}}
            style={{backgroundImage: `url(${reset})`, backgroundRepeat: "no-repeat", backgroundPosition: "50% 50%", backgroundSize: "70%" }}
            // style={{backgroundImage: './logo.svg'}}
            onClick={() => {
              setState(State.initial);
              setHistory([]);
              setTime(0);
            }}
          >
          </button>
        )}

        {(
          state === State.focus ||
          state === State.break
        ) && (
          <button
            className="circle-button"
            aria-label="finish"
            style={{backgroundImage: `url(${finish})`, backgroundRepeat: "no-repeat", backgroundPosition: "50% 50%", backgroundSize: "70%" }}
            onClick={() => {
              setState(State.results);
              setHistory([...history, time]);
            }}
          >
          </button>
        )}


      </header>
    </div>
  );
}

export default App;

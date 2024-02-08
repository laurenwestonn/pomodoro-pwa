import logo from './logo.svg';
import './App.css';
import PomodoroButton from './tsx/PomodoroButton';
import { useEffect, useState } from 'react';

export enum State {
  initial,
  focus,
  break,
  results
}

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

        <h1>Lauren's pomodoro app</h1>
        <h3>state: {State[state]}</h3>
        <h3>history: {history.length === 0 ? "empty" : history.join()}</h3>
        <h3>time: {time}</h3>

        <PomodoroButton
          state={state}
          setState={setState}
          history={history}
          setHistory={setHistory}
          time={time}
          setTime={setTime}
        />

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

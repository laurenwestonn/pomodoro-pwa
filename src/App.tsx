import logo from './logo.svg';
import './App.css';
import PomodoroButton from './tsx/PomodoroButton';
import { useState } from 'react';
import Stopwatch from './tsx/Stopwatch';

function App() {
  const [isRunning, setIsRunning] = useState(false);

  function setTimerRunning() {
    setIsRunning(true);
  }

  function setTimerNotRunning() {
    setIsRunning(false);
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>{isRunning ? "Running..." : "Paused"}</h1>
        <Stopwatch
          isRunning={isRunning}
        />
        <PomodoroButton
          isRunning={isRunning}
          onClick={ isRunning ? setTimerNotRunning : setTimerRunning }
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

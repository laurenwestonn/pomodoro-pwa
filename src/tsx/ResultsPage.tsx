import "../styles/ResultsPage.css";

interface ResultsPageInterface {
  time: number;
  history: number[];
  setHistory: (time: number[]) => void;
}

const formatTimeSimple = (time: number) => {
  const absTime = Math.abs(time);
  if (absTime < 60) {
    return `${absTime}s`;
  } else {
    if (absTime < 3600) {
      return `${Math.floor(absTime / 60)}m ${Math.floor(absTime % 60)}s`;
    }
  }

  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;

  return (
    <>
      {time >= 0 ? "-" : ""} {hours}hr {minutes.toString().padStart(2, "0")}m{" "}
      {seconds.toString().padStart(2, "0")}s
    </>
  );
};

const ResultsPage = (props: ResultsPageInterface) => {
  return (
    <>
      <h1>Results</h1>
      {props.history.map((time, i) => (
        <p key={i} className={i % 2 === 0 ? "time__focus" : "time__break"}>
          {formatTimeSimple(time)}
        </p>
      ))}
    </>
  );
};

export default ResultsPage;

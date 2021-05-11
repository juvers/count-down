import "./styles.css";

import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";
import Typography from "./components/Typography/Typography";

import { useCountdown } from "./hooks/useCountdown";

const INITIAL_VALUES = [1, 0];

export default function App() {
  const isOver = () => {
    document.getElementById("audio").play();
    alert("Done");
  };
  const padTime = (time) => time.toString().padStart(2, "0");

  const {
    remainingTime: { seconds, minutes },
    setter: { setMinutes, setSeconds },
    stop,
    start,
    restart,
    working,
    setWorking,
  } = useCountdown(INITIAL_VALUES, () => isOver());

  const handleStart = () => {
    start();
    setWorking(true);
  };

  const handleStop = () => {
    stop();
    setWorking(false);
  };

  const handleRestart = () => {
    restart();
    setWorking(true);
  };
  const handleInputChange = (e, type) => {
    if (type === "minute") {
      setMinutes(!e.target.value ? "" : Number(e.target.value));
    }
    if (type === "second") {
      setSeconds(!e.target.value ? "" : Number(e.target.value));
    }
  };

  return (
    <div className="App">
      <audio id="audio">
        <source src="over.wav" type="audio/mpeg"></source>
      </audio>
      <Container>
        <Input
          disabled={working}
          value={padTime(minutes)}
          name="minute"
          onChange={handleInputChange}
        />

        <Input
          disabled={working}
          value={padTime(seconds)}
          name="second"
          onChange={handleInputChange}
        />
      </Container>

      <Container>
        <Typography>MINUTE</Typography>
        <Typography>SECOND</Typography>
      </Container>

      <Container>
        <Button disabled={!working} onClick={handleStop} name="stop">
          Stop
        </Button>

        <Button
          disabled={working || (!minutes && !seconds) || (!minutes && !seconds)}
          onClick={handleStart}
          name="start"
        >
          Start
        </Button>

        <Button onClick={handleRestart} name="Restart">
          Restart
        </Button>
      </Container>

      <Typography>
        {padTime(minutes)} : {padTime(seconds)}
      </Typography>
    </div>
  );
}

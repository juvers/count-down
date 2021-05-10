import "./styles.css";

import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";
import Typography from "./components/Typography/Typography";

import { useCountdown } from "./hooks/useCountdown";

const INITIAL_VALUES = [1, 1];

export default function App() {
  const isOver = () => {
    document.getElementById("audio").play();
  };

  const {
    remainingTime: { seconds, minutes },
    setter: { setMinutes, setSeconds },
    stop,
    start,
    working,
    setWorking
  } = useCountdown(INITIAL_VALUES, () => isOver());

  const handleStart = () => {
    start();
    setWorking(true);
  };

  const handleStop = () => {
    stop();
    setWorking(false);
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
      <Container>
        <Input
          disabled={working}
          value={minutes}
          name="minute"
          onChange={handleInputChange}
        />

        <Input
          disabled={working}
          value={seconds}
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
      </Container>
    </div>
  );
}

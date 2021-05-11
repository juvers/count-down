import { useState, useEffect, useRef } from "react";

export const useCountdown = (time, callback) => {
    const [minutes, setMinutes] = useState(time[0]);
    const [seconds, setSeconds] = useState(time[1]);
    const [working, setWorking] = useState(false);
    const intervalRef = useRef();

    useEffect(() => {
        if (working) {
            intervalRef.current = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(intervalRef);
                    setWorking(false);
                    callback();
                } else {
                    if (seconds === 0) {
                        setMinutes((prevState) => prevState - 1);
                    }
                    setSeconds((prevState) => {
                        if (prevState === 0) {
                            return 59;
                        } else {
                            return prevState - 1;
                        }
                    });
                }
            }, 1000);
            return () => {
                clearInterval(intervalRef.current);
            };
        }
    }, [callback, minutes, seconds, working]);

    const stop = () => {
        setWorking(false);
        clearInterval(intervalRef.current);
    };

    const start = () => {
        setWorking(true);
    };

    const restart = () => {
        clearInterval(intervalRef.current);
        setMinutes(10);
        setSeconds(0);
        setWorking(true);
    }

    return {
        remainingTime: { minutes, seconds },
        setter: { setMinutes, setSeconds },
        stop,
        start,
        restart,
        working,
        setWorking
    };
};
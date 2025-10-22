import React, { useEffect, useState } from "react";
import { fetchEvents, resetLatest } from "../api";
import ButtonGrid from "../components/ButtonGrid";
import "./CountdownScreen.css";

interface Props {
  onButtonDetected: (button: number) => void;
  onTimeout: () => void;
}

const CountdownScreen: React.FC<Props> = ({ onButtonDetected, onTimeout }) => {
  const [count, setCount] = useState(10);
  const [activeButton, setActiveButton] = useState<number|null>(null);

  useEffect(() => { resetLatest(); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) { clearInterval(timer); onTimeout(); }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeout]);

  useEffect(() => {
    const poll = setInterval(async () => {
      const res = await fetchEvents();
      if (res.button) {
        setActiveButton(res.button);
        clearInterval(poll);
        setTimeout(() => onButtonDetected(res.button), 800);
      }
    }, 500);
    return () => clearInterval(poll);
  }, [onButtonDetected]);

  return (
    <div className="card stack">
      <div className="h2 count-title">10秒以内にボタンを押してください</div>
      <div className="countdown">{count}</div>
      <ButtonGrid activeButton={activeButton} />
    </div>
  );
};

export default CountdownScreen;

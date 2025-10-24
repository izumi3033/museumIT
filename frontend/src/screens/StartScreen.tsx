import React from "react";
import "./StartScreen.css";

interface Props {
  onStart: () => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => (
  <div className="card stack start-wrap">
    <div className="h1 start-title">傘を刺すドン！！！！☺️</div>
    <button className="btn" onClick={onStart}>始める</button>
  </div>
);

export default StartScreen;

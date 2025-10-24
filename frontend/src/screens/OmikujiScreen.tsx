import React from "react";
import Omikuji from "../components/Omikuji";
import "./OmikujiScreen.css";

interface Props {
  onNext: () => void;
}

const OmikujiScreen: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="card stack omikuji-wrap">
      <div className="h1">今日の運勢</div>
      <div className="omikuji-content">
        <Omikuji />
      </div>
      <button className="btn" onClick={onNext}>次へ</button>
    </div>
  );
};

export default OmikujiScreen;

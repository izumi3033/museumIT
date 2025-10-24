import React from "react";
import QRCodeBox from "../components/QRCodeBox";
import "./SurveyScreen.css";

interface Props {
  onBackToStart: () => void;
}

const SurveyScreen: React.FC<Props> = ({ onBackToStart }) => {
  return (
    <div className="card stack">
      <div className="h1">アンケート</div>
      
      <QRCodeBox title="アンケートにご協力ください" url={""} />
      
      <button className="btn secondary" onClick={onBackToStart}>スタート画面に戻る</button>
    </div>
  );
};

export default SurveyScreen;
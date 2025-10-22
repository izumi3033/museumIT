import React from "react";
import { postConfirm } from "../api";
import "./ResultScreen.css";

interface Props {
  button: number | null;
  onConfirm: () => void;
  onBack: () => void;
}

const ResultScreen: React.FC<Props> = ({ button, onConfirm, onBack }) => {
  const handleConfirm = async () => {
    await postConfirm();
    onConfirm();
  };

  return (
    <div className="card stack result-wrap">
      <div className="h1">結果の確認</div>
      {button ? (
        <div className="h2">あなたが刺したのは「{button}」でよろしいですか？</div>
      ) : (
        <div className="h2">ボタンが検出されませんでした。</div>
      )}
      <div className="actions result-actions">
        <button className="btn secondary" onClick={onBack}>戻る</button>
        {button && <button className="btn" onClick={handleConfirm}>この内容で確定</button>}
      </div>
    </div>
  );
};

export default ResultScreen;

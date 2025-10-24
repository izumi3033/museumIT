import React from "react";
import { postConfirm } from "../api";
import "./ResultScreen.css";

interface Props {
  button: number | null;
  onConfirm: () => void;
  onBack: () => void;
}

// 数字をアルファベットに変換するヘルパー関数
const numberToAlphabet = (num: number): string => {
  return String.fromCharCode(64 + num); // 1→A, 2→B, ... 15→O
};

const ResultScreen: React.FC<Props> = ({ button, onConfirm, onBack }) => {
  const handleConfirm = async () => {
    await postConfirm();
    onConfirm();
  };

  // ボタン配置図の生成
  const buttonGrid = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="card stack result-wrap">
      <div className="h1">結果の確認</div>
      {button ? (
        <>
          <div className="h2">あなたが刺したのは「{numberToAlphabet(button)}」でよろしいですか？</div>
          
          {/* ボタン配置図 */}
          <div className="button-map">
            <div className="map-title">ボタンの配置</div>
            <div className="map-grid">
              {buttonGrid.map((num) => (
                <div
                  key={num}
                  className={`map-cell ${num === button ? "selected" : ""}`}
                >
                  <div className="map-letter">{numberToAlphabet(num)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
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

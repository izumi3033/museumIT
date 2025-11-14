// ボタン詳細画面（テキストのみ表示に簡素化）
import React from "react";

interface Props {
  button: number; // 1-15
  onBack: () => void;
}

const labels = (num: number) => String.fromCharCode(64 + num); // 1->A

const descriptions: Record<number,string> = {
  1: "A: 23.2％",
  2: "B: 4.9％",
  3: "C: 4.9％",
  4: "D: 7.0％",
  5: "E: 26.1％",
  6: "F: 0.7％",
  7: "G: 3.5％",
  8: "H: 1.4％",
  9: "I: 5.6％",
  10:"J: 0.7％",
  11:"K: 5.6％",
  12:"L: 2.1％",
  13:"M: 2.1％",
  14:"N: 2.1％",
  15:"O: 9.9％",
};

const ButtonDetailScreen: React.FC<Props> = ({ button, onBack }) => {
  return (
    <div className="card stack">
      <div className="h2">ボタン {labels(button)} が押されました</div>
      <p style={{margin:0, fontSize: "28px", fontWeight: 700}}>{descriptions[button] ?? "このボタンの説明は未設定です。"}</p>
      <div className="actions" style={{marginTop: "24px"}}>
        <button className="btn secondary" onClick={onBack}>戻る</button>
      </div>
    </div>
  );
};

export default ButtonDetailScreen;

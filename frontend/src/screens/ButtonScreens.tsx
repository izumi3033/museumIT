// ボタン詳細画面（テキストのみ表示に簡素化）
import React from "react";

interface Props {
  button: number; // 1-15
  onBack: () => void;
}

const labels = (num: number) => String.fromCharCode(64 + num); // 1->A

const descriptions: Record<number,string> = {
  1: "A: はじめの一歩。",
  2: "B: 未来への扉。",
  3: "C: 創造と発見。",
  4: "D: 調和とつながり。",
  5: "E: 変化を受け入れる。",
  6: "F: 挑戦の記憶。",
  7: "G: 静かな集中。",
  8: "H: 協力の力。",
  9: "I: 新しい視点。",
  10:"J: 小さな成功。",
  11:"K: 探求の継続。",
  12:"L: 軽やかな進歩。",
  13:"M: 学びの共有。",
  14:"N: アイデアの芽生え。",
  15:"O: 次のステージへ。"
};

const ButtonDetailScreen: React.FC<Props> = ({ button, onBack }) => {
  return (
    <div className="card stack">
      <div className="h2">ボタン {labels(button)} が押されました</div>
      <p style={{margin:0, fontSize: "18px", fontWeight: 600}}>{descriptions[button] ?? "このボタンの説明は未設定です。"}</p>
      <div className="actions" style={{marginTop: "24px"}}>
        <button className="btn secondary" onClick={onBack}>戻る</button>
      </div>
    </div>
  );
};

export default ButtonDetailScreen;

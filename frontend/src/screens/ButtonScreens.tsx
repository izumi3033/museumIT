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

const parsePercent = (s: string): number => {
  const m = s.match(/([0-9]+(?:\.[0-9]+)?)％/);
  return m ? parseFloat(m[1]) : 0;
};

const ButtonDetailScreen: React.FC<Props> = ({ button, onBack }) => {
  const text = descriptions[button] ?? "データなし";
  const pct = parsePercent(text);
  const pctStr = pct.toFixed(1) + "%";
  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    e.currentTarget.style.setProperty("--x", x + "%");
    e.currentTarget.style.setProperty("--y", y + "%");
  };
  return (
    <div className="card fun-detail stack" onMouseMove={handleMove}>
      <div className="flare" />
      <div className="h2">{String.fromCharCode(64 + button)} を選んだ人の割合</div>
      <div className="percentage-badge" aria-label={pctStr}>{pctStr}</div>
      <div className="progress-wrap">
        <div className="progress-bar" style={{"--w": pct + "%"} as React.CSSProperties}>
          <span />
        </div>
        <div className="progress-label">全体の {pctStr}</div>
      </div>
      <div className="actions" style={{marginTop: "24px"}}>
        <button className="btn back-btn-fun" onClick={onBack}>戻る</button>
      </div>
    </div>
  );
};

export default ButtonDetailScreen;

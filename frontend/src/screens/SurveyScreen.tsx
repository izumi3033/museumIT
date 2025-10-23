import React, { useEffect, useState } from "react";
import { fetchStats } from "../api";
import type { StatsData } from "../types";
import "./SurveyScreen.css";

interface Props {
  onBackToStart: () => void;
}

const SurveyScreen: React.FC<Props> = ({ onBackToStart }) => {
  const [stats, setStats] = useState<StatsData>({});
  const total = Object.values(stats).reduce((a,b)=>a+b,0);

  useEffect(() => {
    (async () => {
      const data = await fetchStats();
      setStats(data);
    })();
  }, []);

  return (
    <div className="card stack">
      <div className="h1">これまでの統計</div>
      <div className="stats-card">
        <div className="stats-bars">
          {Object.entries(stats).map(([key, val]) => {
            const perc = total ? (val / total) * 100 : 0;
            return (
              <div key={key} className="stat-row">
                <div className="stat-label">{key}</div>
                <div className="stat-track">
                  <div className="stat-fill" style={{ width: `${perc}%` }} />
                </div>
                <div className="stat-perc">{val}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="qr-wrap">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://forms.gle/xxxxxx"
          alt="アンケートQR"
        />
        <div className="qr-caption">スマホでアンケートにご協力ください</div>
      </div>
      <div className="actions">
        <button className="btn" onClick={onBackToStart}>スタート画面へ戻る</button>
      </div>
    </div>
  );
};

export default SurveyScreen;

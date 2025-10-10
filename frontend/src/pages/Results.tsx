import { useEffect, useState } from "react";
import { getStats } from "../api/endpoints";
import StatBars from "../components/StatBars";
import Omikuji from "../components/Omikuji";
import L from "../styles/layout.module.css";

export default function Results() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await getStats();
        setStats(s);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setErr(msg || "failed");
      }
    })();
  }, []);

  return (
    <div className={L.container}>
      <div className={L.card}>
        <div className={L.header}>
          <div className={L.title}>統計 & おみくじ</div>
          <div className={L.actions}>
            <a className={L.secondary} href="/">トップへ</a>
            <a className={L.primary} href="/survey">アンケートへ →</a>
          </div>
        </div>

        {err && <p style={{ color: "var(--danger)" }}>取得に失敗しました: {err}</p>}

        {stats ? (
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: 24 }}>
            <div><StatBars data={stats} /></div>
            <div><Omikuji /></div>
          </div>
        ) : (
          <p>読み込み中...</p>
        )}
      </div>
    </div>
  );
}

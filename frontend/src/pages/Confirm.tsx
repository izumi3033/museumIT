import { useEffect, useMemo, useState } from "react";
import { postConfirm } from "../api/endpoints";
import L from "../styles/layout.module.css";

function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}

export default function Confirm() {
  const q = useQuery();
  const initial = Number(q.get("button") || "0") || null;
  const [button, setButton] = useState<number | null>(initial);
  const [busy, setBusy] = useState(false);

  const nums = Array.from({ length: 15 }, (_, i) => i + 1);

  async function confirm() {
    if (button == null) {
      alert("ボタンを選んでください");
      return;
    }
    setBusy(true);
    try {
      await postConfirm({ button });
      window.location.href = "/results";
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      alert("保存に失敗しました: " + msg);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    document.title = "確認";
  }, []);

  return (
    <div className={L.container}>
      <div className={L.card}>
        <div className={L.header}>
          <div className={L.title}>確認</div>
          <div className={L.actions}>
            <a className={L.secondary} href="/press">← 入力へ戻る</a>
          </div>
        </div>

        <p>押されたボタン番号を確認してください。必要なら修正できます。</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0" }}>
          {nums.map((n) => (
            <button
              key={n}
              onClick={() => setButton(n)}
              className={n === button ? L.primary : L.secondary}
              aria-pressed={n === button}
            >
              {n}
            </button>
          ))}
        </div>

        <div className={L.actions}>
          <button className={L.primary} onClick={confirm} disabled={busy}>
            {busy ? "保存中..." : "確定して保存"}
          </button>
          <a className={L.secondary} href="/">トップへ</a>
        </div>
      </div>
    </div>
  );
}

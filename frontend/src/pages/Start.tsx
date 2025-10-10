import { useEffect, useState } from "react";
import { resetLatest, health } from "../api/endpoints";
import L from "../styles/layout.module.css";

export default function Start(){
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(()=>{
    (async()=>{
      try{
        await resetLatest();
        const h = await health();
        setOk(h.ok && h.online);
      }catch{ setOk(false); }
    })();
  },[]);
  return (
    <div className={L.container}>
      <div className={L.card}>
        <div className={L.header}>
          <div className={L.title}>投票デモ / Button Vote</div>
        </div>
        <p>これから投票を開始します。次の画面で10秒以内にボタンを押してください。</p>
        <div className={L.actions}>
          <a className={L.primary} href="/press">投票を開始</a>
          <a className={L.secondary} href="/results">統計を見る</a>
        </div>
        <p style={{marginTop:16, color: ok? "var(--accent)" : "var(--danger)"}}>
          バックエンド: {ok===null?"確認中...": ok?"オンライン":"オフライン"}
        </p>
      </div>
    </div>
  );
}

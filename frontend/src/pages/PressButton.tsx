import { useCallback, useEffect, useRef, useState } from "react";
import { getEvents } from "../api/endpoints";
import Countdown from "../components/Countdown";
import ButtonGrid from "../components/ButtonGrid";
import L from "../styles/layout.module.css";
import C from "../styles/cards.module.css";

export default function PressButton(){
  const [live, setLive] = useState<number|null>(null);
  const [selected, setSelected] = useState<number|null>(null);
  const tRef = useRef<number | null>(null);

  // /events を 200ms でポーリング
  useEffect(()=>{
    tRef.current = window.setInterval(async ()=>{
      try{
        const res = await getEvents();
        if (res.button !== null) setLive(res.button);
      }catch{ /* empty */ }
    },200);
    return ()=>{ if (tRef.current) clearInterval(tRef.current); };
  },[]);

  useEffect(()=>{ if (live!=null) setSelected(live); },[live]);

  const finish = useCallback(()=>{
    if (selected!=null) {
      window.location.href = `/confirm?button=${selected}`;
    } else {
      alert("押下が検出できませんでした。ボタンを選んで『確認へ』を押してください。");
    }
  },[selected]);

  return (
    <div className={L.container}>
      <div className={L.card}>
        <div className={L.header}>
          <div className={L.title}>ボタン入力</div>
          <div className={L.actions}><a className={L.secondary} href="/">← 戻る</a></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <div>
            <Countdown seconds={10} onFinish={finish}/>
            <div className={C.subtle} style={{marginTop:12}}>ライブ入力: {live ?? "—"}</div>
          </div>
          <div>
            <div className={C.cardTitle}>3×5 ボタン</div>
            <ButtonGrid selected={selected} liveIncoming={live} onSelect={setSelected}/>
            <div style={{marginTop:16}} className={L.actions}>
              <button className={L.primary}
                onClick={()=>{
                  if (selected==null){ alert("ボタンを選択してください"); return; }
                  window.location.href = `/confirm?button=${selected}`;
                }}>
                確認へ
              </button>
              <a className={L.secondary} href="/press">リセット</a>
            </div>
          </div>
        </div>
        <p className={C.subtle} style={{marginTop:12}}>
          ヒント: 点線枠がライブ入力。<span className={C.kbd}>Tab</span> / <span className={C.kbd}>Enter</span>でも操作可。
        </p>
      </div>
    </div>
  );
}

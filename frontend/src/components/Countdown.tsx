import { useEffect, useRef, useState } from "react";
import styles from "../styles/cards.module.css";

export default function Countdown({ seconds, onFinish }:{seconds:number;onFinish:()=>void}) {
  const [left, setLeft] = useState(seconds);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    tRef.current = window.setInterval(() => {
      setLeft(v => {
        if (v <= 1) {
          if (tRef.current) clearInterval(tRef.current);
          onFinish();
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => { if (tRef.current) clearInterval(tRef.current); };
  }, [onFinish]);

  const pct = Math.max(0, Math.min(100, (left/seconds)*100));
  return (
    <div>
      <div className={styles.cardTitle}>制限時間</div>
      <div style={{fontSize:48,fontWeight:900,lineHeight:1}}>{left}s</div>
      <div style={{height:10,background:"#1c2634",borderRadius:999,marginTop:8,overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:"var(--accent)"}}/>
      </div>
      <div className={styles.subtle} style={{marginTop:6}}>
        10秒以内にどれかのボタンを押してください（Arduino入力は自動反映）
      </div>
    </div>
  );
}

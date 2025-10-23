import { useMemo } from "react";
import s from "../styles/cards.module.css";

const fortunes = [
  { label:"大吉", detail:"今日は最高の運勢！思い切って行動を。" },
  { label:"中吉", detail:"良い流れ。やりかけを仕上げると◎" },
  { label:"小吉", detail:"小さな喜びがありそう。丁寧にいこう。" },
  { label:"吉",   detail:"可もなく不可もなし。整える日に。" },
  { label:"末吉", detail:"焦らず一歩ずつ。準備が実を結ぶ。" },
  { label:"凶",   detail:"慎重に。無理は禁物、休息を。" }
];

export default function Omikuji({ seed }:{seed?:string}) {
  const pick = useMemo(()=>{
    const now = new Date().toISOString().slice(0,10);
    const key = (seed ?? now).split("").reduce((a,c)=>a+c.charCodeAt(0),0);
    return fortunes[key % fortunes.length];
  },[seed]);

  return (
    <div>
      <div className={s.cardTitle}>おみくじ</div>
      <div style={{fontSize:36,fontWeight:900,marginBottom:6}}>{pick.label}</div>
      <div className={s.subtle}>{pick.detail}</div>
    </div>
  );
}

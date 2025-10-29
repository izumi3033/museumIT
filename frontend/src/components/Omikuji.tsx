import { useMemo } from "react";
import s from "../styles/cards.module.css";

// 確率付きおみくじ定義（weightの合計で確率が決まる）
const fortunes = [
  { label:"大吉", detail:"今日は最高の運勢！思い切って行動を。", weight: 10 },
  { label:"中吉", detail:"良い流れ。やりかけを仕上げると◎", weight: 20 },
  { label:"小吉", detail:"小さな喜びがありそう。丁寧にいこう。", weight: 25 },
  { label:"吉",   detail:"可もなく不可もなし。整える日に。", weight: 30 },
  { label:"末吉", detail:"焦らず一歩ずつ。準備が実を結ぶ。", weight: 10 },
  { label:"凶",   detail:"慎重に。無理は禁物、休息を。", weight: 5 }
];

// 確率に基づいてランダムに選択する関数
function weightedRandom(items: typeof fortunes, randomValue: number): typeof fortunes[0] {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let threshold = randomValue * totalWeight;
  
  for (const item of items) {
    threshold -= item.weight;
    if (threshold < 0) {
      return item;
    }
  }
  
  return items[items.length - 1];
}

export default function Omikuji({ seed }:{seed?:string}) {
  const pick = useMemo(()=>{
    const now = new Date().toISOString().slice(0,10);
    const key = (seed ?? now).split("").reduce((a,c)=>a+c.charCodeAt(0),0);
    
    // seedから0-1の疑似乱数を生成
    const random = (Math.sin(key) * 10000) % 1;
    const randomValue = Math.abs(random);
    
    return weightedRandom(fortunes, randomValue);
  },[seed]);

  return (
    <div>
      <div className={s.cardTitle}>おみくじ</div>
      <div style={{fontSize:36,fontWeight:900,marginBottom:6}}>{pick.label}</div>
      <div className={s.subtle}>{pick.detail}</div>
    </div>
  );
}

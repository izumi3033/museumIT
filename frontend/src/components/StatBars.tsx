import st from "../styles/stats.module.css";
export default function StatBars({ data }:{data:Record<string,number>}) {
  const entries = Object.entries(data).sort((a,b)=>Number(a[0])-Number(b[0]));
  const max = Math.max(1, ...entries.map(([,v])=>v));
  return (
    <div className={st.wrapper} role="list" aria-label="stats">
      {entries.map(([k,v])=>{
        const w = `${(v/max)*100}%`;
        return (
          <div key={k} className={st.row}>
            <div className={st.label}>{k}</div>
            <div className={st.barWrap}><div className={st.bar} style={{width:w}}/></div>
            <div className={st.value}>{v}</div>
          </div>
        );
      })}
      <div className={st.legend}>各ボタンの累計回数（Google Sheets集計）</div>
    </div>
  );
}

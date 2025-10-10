import styles from "../styles/grid.module.css";

export default function ButtonGrid(
  { selected, liveIncoming, onSelect }:
  { selected?:number|null; liveIncoming?:number|null; onSelect?:(n:number)=>void }
){
  const buttons = Array.from({length:15},(_,i)=>i+1);
  return (
    <div className={styles.grid} role="grid" aria-label="buttons grid">
      {buttons.map(n=>{
        const isSelected = selected===n;
        const isLive = liveIncoming===n;
        return (
          <button key={n}
            className={[styles.btn, isSelected?styles.selected:"", isLive?styles.live:""].join(" ")}
            onClick={()=>onSelect?.(n)} aria-pressed={isSelected}>
            {n}
          </button>
        );
      })}
    </div>
  );
}

import { QRCodeCanvas } from "qrcode.react";
import s from "../styles/cards.module.css";

export default function QRCodeBox({ url, title="アンケート" }:{url:string;title?:string}) {
  return (
    <div>
      <div className={s.cardTitle}>{title}</div>
      <div className={s.stack}>
        <div><a href={url} target="_blank" rel="noreferrer">{url}</a></div>
        <div style={{background:"#0f151d",padding:16,borderRadius:12,width:"fit-content"}}>
          <QRCodeCanvas value={url} size={160} includeMargin />
        </div>
        <div className={s.subtle}>スマホで読み取るか、リンクをクリックしてください。</div>
      </div>
    </div>
  );
}

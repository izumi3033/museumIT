export default function QRCodeBox({ url, title="アンケート" }:{url:string;title?:string}) {
  return (
    <div>
      <div className="h2">{title}</div>
      <div className="stack">
        <div><a href={url} target="_blank" rel="noreferrer">{url}</a></div>
        <div style={{background:"#0f151d",padding:16,borderRadius:12,width:"fit-content"}}>
          <img src="/QR_musium.png" alt="QRコード" style={{width:160,height:160,display:"block"}} />
        </div>
        <div className="h3">スマホで読み取ってください
        </div>
      </div>
    </div>
  );
}

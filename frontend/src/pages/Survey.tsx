import QRCodeBox from "../components/QRCodeBox";
import L from "../styles/layout.module.css";

export default function Survey(){
  const url = "https://forms.gle/your-google-form-id"; // ←差し替え
  return (
    <div className={L.container}>
      <div className={L.card}>
        <div className={L.header}>
          <div className={L.title}>アンケート</div>
          <div className={L.actions}><a className={L.secondary} href="/results">← 戻る</a></div>
        </div>
        <p>ご協力ありがとうございます。以下のリンクまたはQRコードからご回答ください。</p>
        <QRCodeBox url={url} title="アンケート（Googleフォーム）" />
      </div>
    </div>
  );
}

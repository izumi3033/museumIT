import { useEffect, useRef, useState } from "react";
import ButtonGrid from "./components/ButtonGrid";
import ButtonDetailScreen from "./screens/ButtonScreens";
import { fetchEvents, resetLatest } from "./api";

function App() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const pollRef = useRef<number | null>(null);

  // ハードウェア押下検出ポーリング
  useEffect(() => {
    if (activeButton !== null) {
      // 選択中は停止
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
      return;
    }
    // 最新リセット
    resetLatest().catch(()=>{});
    pollRef.current = window.setInterval(async () => {
      try {
        const ev = await fetchEvents();
        if (ev.button) {
          setActiveButton(ev.button);
        }
      } catch (e) {
        // 失敗時は無視
      }
    }, 600);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [activeButton]);

  const handleSelect = (btn: number) => setActiveButton(btn);
  const handleBack = () => {
    setActiveButton(null);
    resetLatest().catch(()=>{});
  };

  return (
    <div className="app-shell">
      {activeButton !== null ? (
        <ButtonDetailScreen button={activeButton} onBack={handleBack} />
      ) : (
        <div className="card stack">
          <div className="title-box">
            <div className="h2 pop-title pop-title-red">好きな場所に傘を刺してください</div>
          </div>
          <div className="h3">画面は自動で戻ります</div>
          <ButtonGrid activeButton={null} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import StartScreen from "./screens/StartScreen";
import CountdownScreen from "./screens/CountdownScreen";
import ResultScreen from "./screens/ResultScreen";
import SurveyScreen from "./screens/SurveyScreen";
import OmikujiScreen from "./screens/OmikujiScreen";

function App() {
  const [screen, setScreen] = useState<"start"|"countdown"|"result"|"omikuji"|"survey">("start");
  const [selectedButton, setSelectedButton] = useState<number|null>(null);

  return (
    <div className="app-shell">
      {screen === "start" && <StartScreen onStart={() => setScreen("countdown")} />}
      {screen === "countdown" && (
        <CountdownScreen
          onButtonDetected={(btn) => { setSelectedButton(btn); setScreen("result"); }}
          onTimeout={() => setScreen("start")}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          button={selectedButton}
          onConfirm={() => setScreen("omikuji")}
          onBack={() => setScreen("countdown")}
        />
      )}
      {screen === "omikuji" && (
        <OmikujiScreen onNext={() => setScreen("survey")} />
      )}
      {screen === "survey" && (
        <SurveyScreen onBackToStart={() => setScreen("start")} />
      )}
    </div>
  );
}

export default App;

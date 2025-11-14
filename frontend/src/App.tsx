import { useState } from "react";
import CountdownScreen from "./screens/CountdownScreen";

function App() {
  const [seed, setSeed] = useState(0);
  return (
    <div className="app-shell">
      <CountdownScreen
        key={seed}
        onButtonDetected={() => {}}
        onTimeout={() => setSeed((s) => s + 1)}
      />
    </div>
  );
}

export default App;

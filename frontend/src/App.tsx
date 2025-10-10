import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import PressButton from "./pages/PressButton";
import Confirm from "./pages/Confirm";
import Results from "./pages/Results";
import Survey from "./pages/Survey";
import "./styles/globals.css";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/press" element={<PressButton/>} />
        <Route path="/confirm" element={<Confirm/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/survey" element={<Survey/>} />
      </Routes>
    </BrowserRouter>
  );
}

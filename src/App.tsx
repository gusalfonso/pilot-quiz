import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import SaveQuestion from "./pages/SaveQuestion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/questioninput" element={<SaveQuestion />} />
    </Routes>
  );
}
export default App;

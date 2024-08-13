import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import SaveQuestion from "./pages/SaveQuestion";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { Toaster } from "sonner";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<Result />} />
        <Route path="/questioninput" element={<SaveQuestion />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/settings" element={""} />
      </Routes>
      <Toaster richColors />
    </>
  );
}
export default App;

import "./App.css";
import { Card } from "./Card";
import { Game } from "./Game";
import { Start } from "./Start";
import { useQuestionStore } from "./store/questions";
// import { PilotLogo } from "./PilotLogo";

function App() {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
        <div className="title">
          <img src="/src/assets/planeicon.svg" alt="planeicon" />
          {/* <PilotLogo /> */}
          <h1>Pilot Quiz</h1>
        </div>
        {questions.length === 0 && <Start />}
      
        {questions.length > 0 && <Card><Game /></Card>}
      
      

    </main>
  );
}
export default App;

import "../App.css";
import "../styles/Home.css";
import Card from "../components/Card.tsx";
import { Game } from "../Game.tsx";

function GamePage() {
  return (
    <main>
      <div className="title">
        <img src="../src/assets/planeicon.svg" alt="planeicon" />
        <h1>Pilot Quiz</h1>
      </div>

      <Card title="Game">
        <Game />
      </Card>
    </main>
  );
}
export default GamePage;

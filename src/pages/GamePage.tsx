import "../App.css";
import "../styles/Home.css";
import { Card } from "../Card.tsx";

function Game() {
  return (
    <main>
      <div className="title">
        <img src="../src/assets/planeicon.svg" alt="planeicon" />
        <h1>Pilot Quiz</h1>
      </div>

      <Card>
        <Game />
      </Card>
    </main>
  );
}
export default Game;
import Card from "../components/Card/Card.tsx";
import { Game } from "../components/Game/Game.tsx";
import "../styles/GamePage.css";

function GamePage() {
  return (
    <main>
      <Card title="Pilot Quiz">
        <Game />
      </Card>
    </main>
  );
}
export default GamePage;

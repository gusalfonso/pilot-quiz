import "../App.css";
import "../styles/Home.css";
import { CreateQuestionTable } from "../services/dblogin.ts";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.tsx";

function Home() {
  const handleClick = async () => {
    await CreateQuestionTable();
  };
  return (
    <main>
      <Card title="Pilot Quiz">
        <Link to="/game">
          <button onClick={handleClick} className="start-btn std-btn">
            ¡Empezar!
          </button>
        </Link>
      </Card>
    </main>
  );
}
export default Home;

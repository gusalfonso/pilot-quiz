import "../App.css";
import "../styles/Home.css";
import { useQuestionStore } from "../store/questions";
import { CreateQuestionTable } from "../services/dblogin.ts";
import { Link } from "react-router-dom";
import Card from "../components/Card.tsx";

function Home() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);

  const handleClick = async () => {
    fetchQuestions(2);
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

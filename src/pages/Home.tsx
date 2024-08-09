import "../App.css";
import "../styles/Home.css";
import { useQuestionStore } from "../store/questions";
import { CreateQuestionTable } from "../services/dblogin.ts";
import { Link } from "react-router-dom";

function Home() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);

  const handleClick = async () => {
    fetchQuestions(2);
    await CreateQuestionTable();
  };
  return (
    <main>
      <div className="card">
        <div className="card-logo">
          <img src="/src/assets/planeicon.svg" alt="planeicon" />
        </div>
        <div className="card-header">
          <h1>Pilot Quiz!</h1>
        </div>
        <Link to="/game">
          <button onClick={handleClick} className="start-button std-btn">
            ¡Empezar!
          </button>
        </Link>
      </div>
    </main>
  );
}
export default Home;

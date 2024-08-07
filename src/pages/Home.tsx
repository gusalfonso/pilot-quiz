import "../App.css";
import "../styles/Home.css";
import { Card } from "../Card";
import { useQuestionStore } from "../store/questions";
import BasicModal from "../components/ModalLogin.tsx";
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
      <div className="title">
        <img src="/src/assets/planeicon.svg" alt="planeicon" />
        <h1>Pilot Quiz</h1>
        <div className="">
          <BasicModal />
        </div>
      </div>

      <Card>
        <Link to="/game">
          <button onClick={handleClick} className="start-button std-btn">
            ¡Empezar!
          </button>
        </Link>
      </Card>
    </main>
  );
}
export default Home;

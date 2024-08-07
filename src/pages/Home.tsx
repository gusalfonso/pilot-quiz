import "../App.css";
import "../styles/Home.css";
import { Card } from "../Card";
import { useQuestionStore } from "../store/questions";
import BasicModal from "../components/ModalLogin.tsx";
import { Link } from "react-router-dom";

function Home() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const handleClick = () => {
    fetchQuestions(2);
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

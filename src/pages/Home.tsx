import "../App.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.tsx";
import { useEffect } from "react";
import { useQuestionStore } from "../store/questions.ts";

function Home() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);

  useEffect(() => {
    fetchQuestions(10);
  }, [fetchQuestions]);

  console.log(currentQuestion);

  return (
    <main>
      <Card title="Pilot Quiz">
        <Link to="/game">
          <button className="start-btn std-btn">¡Empezar!</button>
        </Link>
      </Card>
    </main>
  );
}
export default Home;

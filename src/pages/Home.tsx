import "../App.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card.tsx";
import { useEffect } from "react";
import { useQuestionStore } from "../store/questions.ts";
// import questions from "../../public/morequestions.json";
// import { addQuestionsToDatabase } from "../services/dbmanagequestions.ts";

function Home() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);

  useEffect(() => {
    fetchQuestions(10);
  }, [fetchQuestions]);

  // addQuestionsToDatabase(questions)
  //   .then(() => {
  //     console.log("Todas las preguntas han sido agregadas a la base de datos.");
  //   })
  //   .catch((error) => {
  //     console.error("Error al agregar preguntas a la base de datos:", error);
  //   });

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

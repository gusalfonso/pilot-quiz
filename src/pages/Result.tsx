import Card from "../components/Card/Card";
import { useQuestionStore } from "../store/questions";
import "../styles/Result.css";

export default function Result() {
  const questions = useQuestionStore((state) => state.questions);
  const correctAnswersCount = questions.filter(
    (question) => question.userSelectedAnswer === question.correct
  ).length;

  const title =
    correctAnswersCount / questions.length >= 0.6
      ? "Felicitaciones, has ganado!"
      : "Sigue intentando!";

  return (
    <Card title={title}>
      <p className="resultado">
        Respondiste bien {correctAnswersCount} preguntas de {questions.length}!
      </p>
    </Card>
  );
}

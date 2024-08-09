import { useQuestionStore } from "./store/questions";
import { Question as QuestionType } from "./types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const getBackgroundColor = (info: QuestionType, answer?: string) => {
  const { userSelectedAnswer, correct } = info;
  // Si ninguna pregunta ha sido clickeada, no hacer nada:
  //if (userSelectedAnswer === undefined) return "answer-button";
  // Si se clickea una respuesta incorrecta:
  if (userSelectedAnswer !== correct && userSelectedAnswer === answer)
    return "answer-button incorrect";
  // Si se clickea una respuesta correcta
  if (answer === correct) return "answer-button correct";

  return "answer-button";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectedAnswer);
  const createHandleClick = (answer: string) => () => {
    selectAnswer(info.id, answer);
  };

  return (
    <>
      <h1 className="question">{info.question}</h1>
      <ul>
        {info.answers.map((answer, index) => (
          <li key={index}>
            <button
              className={getBackgroundColor(info, answer)}
              onClick={createHandleClick(answer)}
              disabled={info.userSelectedAnswer ? true : false}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Game = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  return (
    <>
      <nav className="navigation-bar">
        <button onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <SlArrowLeft />
        </button>
        {currentQuestion + 1} / {questions.length}
        <button
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <SlArrowRight />
        </button>
      </nav>

      <Question info={questionInfo} />
    </>
  );
};

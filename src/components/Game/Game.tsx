import { useEffect } from "react";
import { useQuestionStore } from "../../store/questions";
import { Question as QuestionType } from "../../types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "./Game.css";
import { useNavigate } from "react-router-dom";

const getBackgroundColor = (info: QuestionType, answer?: string) => {
  const { userSelectedAnswer, correct } = info;
  if (userSelectedAnswer !== correct && userSelectedAnswer === answer)
    return "answer-button incorrect";
  if (answer === correct && userSelectedAnswer) return "answer-button correct";
  return "answer-button";
};

const Question = ({ info }: { info: QuestionType }) => {
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);

  const selectAnswer = useQuestionStore((state) => state.selectedAnswer);
  const createHandleClick = (answer: string) => () => {
    if (info.id) selectAnswer(info.id, answer);
    setTimeout(() => {
      goNextQuestion();
    }, 500);
  };

  return (
    <div className="question-container">
      <h1 className="question">{info.question}</h1>
      <ul className="answer-container">
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
    </div>
  );
};

export const Game = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const navigate = useNavigate();
  const questionInfo = questions[currentQuestion];

  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  useEffect(() => {
    const allAnswered =
      questions.length &&
      questions.every((q) => q.userSelectedAnswer !== undefined);

    if (allAnswered) {
      setTimeout(() => {
        navigate("/results");
      }, 300);
    }
  }, [questions, navigate]);

  return questionInfo ? (
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
  ) : (
    <p>Loading question...</p>
  );
};

import { useQuestionStore } from "./store/questions";
import { Question as QuestionType } from "./types";

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionStore(state => state.selectedAnswer)
    // console.log(info)
    const createHandleClick = (answer: string) => () => {
        selectAnswer(info.id, answer)
    }   
  return (
    <>
      <h1 className="question">{info.question}</h1>
      <ul>
        {info.answers.map((answer, index) => (
          <li key={index}>
            <button className="answer-button" onClick={createHandleClick(answer)}>{answer}</button>
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

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};

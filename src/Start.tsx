import { useQuestionStore } from "./store/questions";

export const Start = () => {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
  const handleClick = () => {
    fetchQuestions(2)
  }
  return <button onClick={handleClick} className="start-button">¡Empezar!</button>;
};

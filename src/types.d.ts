export interface Question {
  id: number;
  question: string;
  answers: string[];
  correct: string;
  userSelectedAnswer?: string;
  isCorrectUserAnswer?: boolean;
}

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectedAnswer: (questionId: number, answer: string) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

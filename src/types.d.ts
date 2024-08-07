export interface Question {
  id: string;
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
  selectedAnswer: (questionId: string, answer: string) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

// Tipos de datos
export type User = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

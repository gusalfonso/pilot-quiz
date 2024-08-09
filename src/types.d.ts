export interface Question {
  id: string;
  question: string;
  answers: string[];
  correct: string;
  userSelectedAnswer?: string;
  isCorrectUserAnswer?: boolean;
}

export interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectedAnswer: (questionId: string, answer: string) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

// USER TYPES
export interface User {
  id?: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

// CARD TYPES
interface CardProps {
  title: string;
  children: ReactNode;
}

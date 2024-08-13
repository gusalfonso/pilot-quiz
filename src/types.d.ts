export interface Question {
  id?: string;
  question: string;
  answers: string[];
  correct?: string;
  userSelectedAnswer?: string;
  isCorrectUserAnswer?: boolean;
  category: string;
  category2: string;
  source: string;
  creator: string;
  imageName: string;
  correctAnswer: string;
}

export interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectedAnswer: (questionId: string, answer: string) => Promise<void>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetCurrent: () => void;
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
export interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

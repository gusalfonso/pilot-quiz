export interface Question {
    id: number;
    question: string;
    answers: string[];
    correct: string;
    userSelectedAnswer?: string;
    isCorrectUserAnswer?: boolean;
}
import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectedAnswer: (questionId: number, answer: string) => Promise<void>
}

export const useQuestionStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({questions})
    },
  selectedAnswer: (questionId: number, answer: string) => {
    const { questions } = get()
    const newQuestions = structuredClone(questions)
    const questionIndex = newQuestions.findIndex(q => q.id === questionId)

    const questionInfo = newQuestions[questionIndex]

    const isCorrectUserAnswer = questionInfo.correct === answer

    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answer
    }

    set({questions: newQuestions})
  }
  };
});

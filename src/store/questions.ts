import { create } from "zustand";
import { State } from "../types";
import confetti from "canvas-confetti";
import { turso } from "../services/client";

export const useQuestionStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await turso.execute("SELECT * FROM questions;");
      // const res = await fetch("http://localhost:5173/data.json");
      // const json = await res.json();

      const transformed = res.rows.map((item) => {
        const { answer1, answer2, answer3, correct, question, id } = item; // Extrae answer1, answer2, y answer3
        return {
          id: id,
          question: question,
          answers: [answer1, answer2, answer3],
          correct: correct,
        };
      });

      const questions = transformed
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
      set({ questions, currentQuestion: 0 });
      // return questions;
    },
    selectedAnswer: (questionId: string, answer: string) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);

      const questionInfo = newQuestions[questionIndex];

      const isCorrectUserAnswer = questionInfo.correct === answer;

      if (isCorrectUserAnswer) confetti();

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answer,
      };

      set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length)
        return set({ currentQuestion: nextQuestion });
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;

      if (currentQuestion > 0)
        return set({ currentQuestion: previousQuestion });
    },

    resetCurrent: () =>
      set({
        currentQuestion: 0,
      }),
  };
});

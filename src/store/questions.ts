// useQuestionStore.ts
import { create } from "zustand";
import { State, Question } from "../types";
import confetti from "canvas-confetti";
import { turso } from "../services/client";

export const useQuestionStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,

  fetchQuestions: async (limit: number) => {
    try {
      const res = await turso.execute("SELECT * FROM questions;");
      const transformed = res.rows.map((item) => {
        const { answer1, answer2, answer3, correct, question, id } = item;
        return {
          id,
          question,
          answers: [answer1, answer2, answer3],
          correct,
        } as Question;
      });

      const questions = transformed
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
      set({ questions, currentQuestion: 0 });
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  },

  selectedAnswer: async (questionId: string, answer: string) => {
    try {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);

      if (questionIndex === -1) return; // Si no se encuentra la pregunta, no hacer nada

      const questionInfo = newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correct === answer;

      if (isCorrectUserAnswer) confetti();

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answer,
      };

      set({ questions: newQuestions });
    } catch (error) {
      console.error("Error al seleccionar la respuesta:", error);
    }
  },

  goNextQuestion: () => {
    const { currentQuestion, questions } = get();
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion });
    }
  },

  goPreviousQuestion: () => {
    const { currentQuestion } = get();
    const previousQuestion = currentQuestion - 1;

    if (previousQuestion >= 0) {
      set({ currentQuestion: previousQuestion });
    }
  },

  resetCurrent: () => set({ currentQuestion: 0 }),
}));

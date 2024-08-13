import { CreateQuestion } from "./dblogin";

export const addQuestionsToDatabase = async (questions: Array<any>) => {
  for (const question of questions) {
    const {
      question: questionText,
      category,
      category2,
      source,
      creator,
      image,
      answers,
      correct,
    } = question;
    try {
      await CreateQuestion({
        question: questionText,
        category,
        category2,
        source,
        creator,
        imageName: image,
        answers: answers,
        correctAnswer: correct,
      });
    } catch (error) {
      console.error("Error al agregar la pregunta:", questionText, error);
    }
  }
};

// Ejecuta la función para agregar preguntas

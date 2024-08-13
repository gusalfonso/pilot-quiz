import React, { useState } from "react";
import Card from "../components/Card/Card.tsx";
import { CreateQuestion, CreateQuestionTable } from "../services/dblogin.ts";
import "../styles/SaveQuestion.css";

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [category2, setCategory2] = useState<string>("");
  const [source, setSource] = useState<string>("");

  const [answers, setAnswers] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );
  // const [image, setImage] = useState<File | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers as [string, string, string]);
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !question ||
      answers.some((answer) => !answer) ||
      correctAnswerIndex === null
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // const imageName = image ? image.name : "";

    try {
      await CreateQuestionTable();
      await CreateQuestion({
        question,
        category: "",
        category2: "",
        source: "",
        creator: "",
        imageName: "",
        answers,
        correctAnswer: answers[correctAnswerIndex],
      });
      alert("Pregunta enviada con éxito");
      setQuestion("");
      setAnswers(["", "", ""]);
      setCorrectAnswerIndex(null);
      // setImage(null);
    } catch (error) {
      console.error("Error al enviar la pregunta", error);
      alert("Hubo un error al enviar la pregunta");
    }
  };

  return (
    <div className="question-generator-container">
      <Card title="Add Question">
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Category"
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>
          {answers.map((answer, index) => (
            <div key={index} className="form-item answer-item">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={correctAnswerIndex === index}
                  onChange={() => setCorrectAnswerIndex(index)}
                />
                Correct
              </label>
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          {/* <div className="form-item">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </div> */}
          <button type="submit" className="std-btn">
            Add Question
          </button>
        </form>
      </Card>
    </div>
  );
};

export default QuestionForm;

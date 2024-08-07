import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  FormControlLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { CreateQuestion, CreateQuestionTable } from "../services/dblogin.ts";

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
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
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generador de Preguntas
        </Typography>
        <TextField
          fullWidth
          label="Pregunta"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          margin="normal"
        />
        {answers.map((answer, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <TextField
              fullWidth
              label={`Respuesta ${index + 1}`}
              variant="outlined"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={correctAnswerIndex === index}
                  onChange={() => setCorrectAnswerIndex(index)}
                />
              }
              label="Correcta"
              sx={{ ml: 2 }}
            />
          </Box>
        ))}
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: 20 }}
        /> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Enviar Pregunta
        </Button>
      </Box>
    </Container>
  );
};

export default QuestionForm;

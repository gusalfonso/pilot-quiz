import { createClient } from "@libsql/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { Question, User } from "../types";

// CREACIÓN DEL CLIENTE DE TURSO:
export const turso = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL as string,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN as string,
});

// LIDIANDO CON LA TABLA DE USUARIOS:
export const CreateUsersTable = async (): Promise<void> => {
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, name TEXT NOT NULL, surname TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
  );
};

// INYECCIÓN DE USUARIO EN LA TABLA:
export const CreateUser = async ({
  username,
  name,
  surname,
  email,
  password,
}: User): Promise<void> => {
  const hash = bcrypt.hashSync(password, 10);
  await turso.execute({
    sql: "INSERT INTO users (id, username, name, surname, email, password) VALUES (:id, :username, :name, :surname, :email, :password)",
    args: {
      id: uuidv4(),
      username: username,
      name: name,
      surname: surname,
      email: email,
      password: hash,
    },
  });
};

// CREACIÓN TABLA DE PREGUNTAS:
export const CreateQuestionTable = async (): Promise<void> => {
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS questions ( id TEXT PRIMARY KEY, question TEXT NOT NULL, category TEXT, category2 TEXT, source TEXT, creator TEXT, image_name TEXT, answer1 TEXT NOT NULL, answer2 TEXT NOT NULL, answer3 TEXT NOT NULL, correct TEXT NOT NULL);"
  );
};

// INYECCIÓN DE PREGUNTAS:
export const CreateQuestion = async ({
  question,
  category = "",
  category2 = "",
  source = "",
  creator = "",
  imageName = "",
  answers,
  correctAnswer,
}: Question): Promise<void> => {
  await turso.execute({
    sql: `
      INSERT INTO questions (id, question, category, category2, source, creator, image_name, answer1, answer2, answer3, correct)
      VALUES (:id, :question, :category, :category2, :source, :creator, :imageName, :answer1, :answer2, :answer3, :correct)
    `,
    args: {
      id: uuidv4(),
      question: question,
      category: category,
      category2: category2,
      source: source,
      creator: creator,
      imageName: imageName,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      correct: correctAnswer,
    },
  });
};

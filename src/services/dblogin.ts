import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { turso } from "./client";

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

export async function authenticateUser(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const result = await turso.execute({
      sql: "SELECT password FROM users WHERE email = :email",
      args: { email },
    });

    const row = result.rows[0]; // Obtener la primera fila
    if (!row) return false;

    const storedPassword = String(row.password); // Accede al campo 'password'

    if (!storedPassword) return false;

    // Comparar la contraseña proporcionada con la almacenada
    return bcrypt.compareSync(password, storedPassword);
  } catch (error) {
    console.error("Error al autenticar:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

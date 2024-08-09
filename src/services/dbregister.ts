import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { turso } from "./client";
import { User } from "../types";

export async function createUsersTable(): Promise<void> {
  await turso.execute(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
}

export async function createUser({
  username,
  name,
  surname,
  email,
  password,
}: User): Promise<void> {
  const hashedPassword = bcrypt.hashSync(password, 10);

  await turso.execute({
    sql: `
      INSERT INTO users (id, username, name, surname, email, password)
      VALUES (:id, :username, :name, :surname, :email, :password)
    `,
    args: {
      id: uuidv4(),
      username: username,
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    },
  });
}

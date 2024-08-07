import { createClient } from "@libsql/client";
import crypto from "crypto";
import bcrypt from "bcrypt";

const turso = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
});

const CreateUsersTable = async () => {
  await turso.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, name TEXT NOT NULL, surname TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
  );
};

const CreateUser = async (username, name, surname, email, password) => {
  const hash = bcrypt.hashSync(password, 10);
  await turso.execute({
    sql: "INSERT INTO users (id, username, name, surname, email, password) VALUES (:id, :username, :name, :surname, :email, :password)",
    args: {
      id: crypto.randomUUID(),
      username: username,
      name: name,
      surname: surname,
      email: email,
      password: hash,
    },
  });
};

export { CreateUsersTable, CreateUser, turso };

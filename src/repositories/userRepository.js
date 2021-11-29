import connection from "../database.js";

export async function fetchUser(email) {
  const result = await connection.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

export async function createUser(name, email, password) {
  await connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
}

export async function createSession(token, userId) {
  await connection.query(
    "INSERT INTO sessions (token, user_id) VALUES ($1, $2);",
    [token, userId]
  );
}

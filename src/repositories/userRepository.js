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

export async function fetchSession(userId) {
  const result = await connection.query(
    `
      SELECT
        sessions.token,
        json_build_object(
          'id', users.id,
          'name', users.name,
          'email', users.email
        ) AS data
      FROM sessions
      JOIN users
        ON sessions.user_id = users.id
      WHERE users.id = $1
    `, [userId]
  );
  return result.rows[0];
}

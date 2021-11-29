import connection from '../database.js';

export async function fetchToken(token) {
  const result = await connection.query(
    'SELECT * FROM sessions WHERE token = $1',
    [token],
  );
  return result.rows[0];
}

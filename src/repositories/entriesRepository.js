import connection from '../database.js';

export async function fetchEntries(userId) {
  const entries = await connection.query(
    'SELECT * FROM entries WHERE user_id = $1',
    [userId],
  );
  return entries.rows;
}

export async function createEntry(description, value, income, userId) {
  await connection.query(
    'INSERT INTO entries (description, value, income, user_id) VALUES ($1, $2, $3, $4)',
    [description || '', value, income, userId],
  );
}

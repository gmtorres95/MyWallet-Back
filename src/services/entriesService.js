import * as entriesRepository from '../repositories/entriesRepository.js';

export async function fetchEntries(userId) {
  return entriesRepository.fetchEntries(userId);
}

export async function createEntry({ description, value, income }, userId) {
  await entriesRepository.createEntry(description, value, income, userId);
}

export async function calculateSum(userId) {
  const entries = await entriesRepository.fetchEntries(userId);
  const total = entries.reduce(
    (sum, curr) => (curr.income ? sum + Number(curr.value) : sum - Number(curr.value)),
    0,
  );
  return { total };
}

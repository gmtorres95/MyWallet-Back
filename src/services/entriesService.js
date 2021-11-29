import * as entriesRepository from "../repositories/entriesRepository.js";

export async function fetchEntries(userId) {
  return await entriesRepository.fetchEntries(userId);
}

export async function createEntry(description, value, income, userId) {
  await entriesRepository.createEntry(description, value, income, userId);
}

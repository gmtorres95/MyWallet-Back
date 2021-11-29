import * as entriesService from "../services/entriesService.js";

export async function getEntries(req, res) {
  const { userId } = res.locals;

  try {
    const entries = await entriesService.fetchEntries(userId);

    res.send(entries);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function createEntry(req, res) {
  const { userId } = res.locals;
  const { description, value, income } = req.body;
  if (income === undefined || !value) return res.sendStatus(400);

  try {
    await entriesService.createEntry(description, value, income, userId);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getEntriesSum(req, res) {
  const { userId } = res.locals;

  try {
    const total = await entriesService.calculateSum(userId);

    res.send(total);
  } catch (err) {
    res.sendStatus(500);
  }
}

import * as entriesService from "../services/entriesService.js";

export async function getEntries(req, res) {
  const { userId } = res.locals;

  try {
    const entries = await entriesService.fetchEntries(userId);

    res.status(200).send(entries);
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.sendStatus(500);
  }
}

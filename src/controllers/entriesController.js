import * as entriesService from '../services/entriesService.js';
import * as validate from '../validations/validations.js';

export async function getEntries(req, res) {
  try {
    const entries = await entriesService.fetchEntries(res.locals.userId);
    res.send(entries);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function createEntry(req, res) {
  try {
    const isInvalid = validate.validateNewEntry(req.body);
    if (isInvalid) return res.sendStatus(400);

    await entriesService.createEntry(req.body, res.locals.userId);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getEntriesSum(req, res) {
  try {
    const total = await entriesService.calculateSum(res.locals.userId);
    res.send(total);
  } catch (err) {
    res.sendStatus(500);
  }
}

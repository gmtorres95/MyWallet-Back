import * as userService from "../services/userService.js";
import * as validate from "../validations/validations.js";

export async function signUp(req, res) {
  try {
    const isInvalid = validate.validateNewUser(req.body);
    if (isInvalid) return res.sendStatus(400);

    const result = await userService.signUp(req.body);
    if (!result) return res.status(409).send("Email already in use");

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const isInvalid = validate.validateUser(req.body);
    if (isInvalid) return res.sendStatus(400);

    const result = await  userService.signIn(req.body);
    if (!result) return res.status(401).send("Wrong email or password");

    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

import * as userService from "../services/userService.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 4) return res.sendStatus(400);

  try {
    const result = await userService.signUp(name, email, password);
    if (!result) return res.status(409).send("This email is already in use");

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password || password.length < 4) return res.sendStatus(400);

  try {
    const result = await  userService.signIn(email, password);
    if (!result) return res.status(401).send("Wrong email or password");

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

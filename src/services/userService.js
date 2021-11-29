import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import * as userRepository from "../repositories/userRepository.js";

export async function signUp(name, email, password) {
  const hash = bcrypt.hashSync(password, 10);
  
  const user = await userRepository.fetchUser(email);
  if (user) return false;

  await userRepository.createUser(name, email, hash);
  return true;
}

export async function signIn(email, password) {
  const user = await userRepository.fetchUser(email);
  if (!user || !bcrypt.compareSync(password, user.password)) return false;
  
  const token = uuid();
  await userRepository.createSession(token, user.id);

  delete user.password;

  return {
    token,
    data: { ...user },
  };
}

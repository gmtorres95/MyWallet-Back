import * as schema from './schemas.js';

export function validateNewUser(user) {
  const joiValidation = schema.newUser.validate(user);
  if (joiValidation.error) return true;
  return false;
}

export function validateUser(user) {
  const joiValidation = schema.user.validate(user);
  if (joiValidation.error) return true;
  return false;
}

export function validateNewEntry(entry) {
  const joiValidation = schema.newEntry.validate(entry);
  if (joiValidation.error) return true;
  return false;
}

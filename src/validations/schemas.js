import joi from "joi";

export const newUser = joi.object({
  name: joi
    .string()
    .min(3)
    .max(15)
    .pattern(/[^0-9.,"?!;:#$%&()*+-/<>=@[\\\]^_{}|~]+/)
    .required(),
  email: joi
    .string()
    .pattern(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i)
    .required(),
  password: joi
    .string()
    .min(4)
    .max(64)
    .required(),
});

export const user = joi.object({
  name: joi
    .string()
    .min(3)
    .max(15)
    .pattern(/[^0-9.,"?!;:#$%&()*+-/<>=@[\\\]^_{}|~]+/)
    .required(),
  email: joi
    .string()
    .pattern(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i)
    .required(),
  password: joi
    .string()
    .min(4)
    .max(64)
    .required(),
});

export const newEntry = joi.object({
  description: joi
    .string()
    .max(255),
  value: joi
    .number()
    .greater(0)
    .required(),
  income: joi
    .boolean()
    .required(),
});

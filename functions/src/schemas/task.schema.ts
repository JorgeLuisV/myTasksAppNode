import Joi from "joi";

const title = Joi.string().min(3).max(100);
const description = Joi.string().min(3).max(500);
const completed = Joi.boolean();
const userID = Joi.string().regex(/^[A-Za-z0-9_-]{20}$/);

export const createTaskSchema = Joi.object({
  title: title.required(),
  description: description,
});

export const getTaskSchema = Joi.object({
  id: userID.required(),
});

export const updateTaskSchema = Joi.object({
  title: title,
  description: description,
  completed: completed,
});

import Joi from "joi";

const title = Joi.string().min(3);
const description = Joi.string().min(3).max(255);
const completed = Joi.boolean();
const userID = Joi.string().min(3);

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

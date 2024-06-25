import express from "express";

import {TaskService} from "../services/task.service";
import validatorHandler from "../middlewares/validator.handler";
import {
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";
import {Payload} from "../types";

// eslint-disable-next-line new-cap
const router = express.Router();
const service = new TaskService();

router.get("/", async (req, res, next) => {
  try {
    const user = req.user as Payload;
    const tasks = await service.findByUserID(user.sub);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createTaskSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user as Payload;
      body.userID = user.sub;

      const newTask = await service.create(body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  validatorHandler(getTaskSchema, "params"),
  validatorHandler(updateTaskSchema, "body"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const task = await service.update(id, body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  validatorHandler(getTaskSchema, "params"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  },
);

export default router;

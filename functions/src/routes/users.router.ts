import express, {Request, Response, NextFunction} from "express";

import {UserService} from "../services/users.service";
import validatorHandler from "../middlewares/validator.handler";
import {validateEmail} from "../schemas/user.schema";
import { UserGetParams } from "../types";

// eslint-disable-next-line new-cap
const router = express.Router();
const service = new UserService();

router.get(
  "/:email",
  validatorHandler(validateEmail, "params"),
  async (req: Request<UserGetParams>, res: Response, next: NextFunction) => {
    try {
      const {email} = req.params;
      const user = await service.getUserForLogin(email);
      const response = service.signToken(user);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  validatorHandler(validateEmail, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      const response = service.signToken(newUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
);

export default router;

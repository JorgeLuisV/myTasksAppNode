import express, {Application} from "express";
import passport from "passport";

import usersRouter from "./users.router";
import tasksRouter from "./tasks.router";

export function routerApi(app: Application) {
  // eslint-disable-next-line new-cap
  const router = express.Router();
  app.use("/api", router);

  // Users route
  router.use("/users", usersRouter);

  // Tasks route
  router.use(
    "/tasks",
    passport.authenticate("jwt", {session: false}),
    tasksRouter,
  );
}

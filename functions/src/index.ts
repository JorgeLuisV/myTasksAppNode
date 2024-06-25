import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";

import {routerApi} from "./routes/index";
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from "./middlewares/error.handler";

const app = express();
app.use(cors({origin: true}));

require("./utils/auth-strategies");

app.get("/", async (_req, res) => {
  res.send("Welcome to MyTasksApp API ;)");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export const mytasksapp = onRequest(app);

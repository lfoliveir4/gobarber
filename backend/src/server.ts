import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import AppError from "./errors/AppError";

import routes from "./routes";
import createConnection from "./database/infra";
import uploadConfig from "./config/upload";

createConnection();

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message, module: err.appModule });
    }

    console.error(err);

    return response
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
);

app.listen(3333, () => {
  console.log("Server Started on port 3333");
});

import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";

import routes from "./http/routes";
import AppError from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import "@shared/container";
import uploadConfig from "@config/upload";

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
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

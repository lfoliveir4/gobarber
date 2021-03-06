import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";

import "@shared/infra/typeorm";
import rateLimiter from "./http/middlewares/rateLimiter";
import routes from "./http/routes";
import AppError from "@shared/errors/AppError";
import "@shared/container";
import uploadConfig from "@config/upload";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());
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

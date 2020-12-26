import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import SessionsContoller from "../controllers/SessionsContoller";

const sessionsRouter = Router();

const sessionsContoller = new SessionsContoller();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsContoller.create
);

export default sessionsRouter;

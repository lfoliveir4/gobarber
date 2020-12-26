import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.put("/", profileController.update);
profileRouter.get(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  profileController.show
);

export default profileRouter;

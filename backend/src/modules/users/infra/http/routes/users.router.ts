import { Router } from "express";
import multer from "multer";
import { celebrate, Segments, Joi } from "celebrate";

import UsersContoller from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarContoller";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";
import uploadConfig from "@config/upload";

const usersRouter = Router();
const usersContoller = new UsersContoller();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersContoller.create
);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;

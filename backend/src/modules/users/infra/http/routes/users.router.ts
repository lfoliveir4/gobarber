import { Router } from "express";
import multer from "multer";

import UsersContoller from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarContoller";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";
import uploadConfig from "@config/upload";

const usersRouter = Router();
const usersContoller = new UsersContoller();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post("/", usersContoller.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;

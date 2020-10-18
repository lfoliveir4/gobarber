import { Router } from "express";

import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.put("/", profileController.update);
profileRouter.get("/", profileController.show);

export default profileRouter;

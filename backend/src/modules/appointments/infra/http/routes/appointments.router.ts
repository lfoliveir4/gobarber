import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";

import AppointmentsContoller from "../controllers/AppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsContoller();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;

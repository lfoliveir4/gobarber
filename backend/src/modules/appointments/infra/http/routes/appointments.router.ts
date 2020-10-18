import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";

import AppointmentsContoller from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsContoller();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post("/", appointmentsController.create);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;

import { Router } from "express";

import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.router";
import usersRouter from "@modules/users/infra/http/routes/users.router";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.router";
import passwordRouter from "@modules/users/infra/http/routes/password.router";
import profileRouter from "@modules/users/infra/http/routes/profile.router";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);

export default routes;

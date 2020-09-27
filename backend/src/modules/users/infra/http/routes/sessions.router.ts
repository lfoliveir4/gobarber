import { Router } from "express";

import SessionsContoller from "../controllers/SessionsContoller";

const sessionsRouter = Router();

const sessionsContoller = new SessionsContoller();

sessionsRouter.post("/", sessionsContoller.create);

export default sessionsRouter;

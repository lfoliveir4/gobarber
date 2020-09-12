import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(401)
      .json({ error: "JWT token is missing", module: "auth" });
    //throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response
      .status(400)
      .json({ error: "JWT invalid token", module: "auth" });

    //throw new Error("Invalid JWT token");
  }
}

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";

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
    throw new AppError("JWT token is missing", 401, "auth");
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
    throw new AppError("JWT invalid token", 400, "auth");
  }
}

import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceHashProvider from "../provider/HashProvider/models/InterfaceHashProvider";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("HashProvider")
    private hashProvider: InterfaceHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorret email/password combination", 401, "auth");
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorret email/password combination", 401, "auth");
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;

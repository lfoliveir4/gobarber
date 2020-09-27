import { injectable, inject } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

import InterfaceHashProvider from "../provider/HashProvider/models/InterfaceHashProvider";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("HashProvider")
    private hashProvider: InterfaceHashProvider
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(
        "Email address already used from another user",
        400,
        "user"
      );
    }

    const hashedPassword = await this.hashProvider.generatedHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;

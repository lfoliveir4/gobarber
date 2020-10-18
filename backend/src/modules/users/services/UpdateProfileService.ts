import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceHashProvider from "../provider/HashProvider/models/InterfaceHashProvider";

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("HashProvider")
    private hashProvider: InterfaceHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("user does not exists", 400, "user");
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError("email already in use", 400, "user");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError("the old_password must be entered ", 400, "user");
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError("old_password dos not match ", 400, "user");
      }

      user.password = await this.hashProvider.generatedHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;

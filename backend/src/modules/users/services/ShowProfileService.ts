import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";

interface Request {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("user does not exists", 400, "user");
    }

    return user;
  }
}

export default ShowProfileService;

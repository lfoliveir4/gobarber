import { injectable, inject } from "tsyringe";
import { isAfter, addHours } from "date-fns";

//import User from "@modules/users/infra/typeorm/entities/User";
//import AppError from "@shared/errors/AppError";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceUserTokensRepository from "../repositories/InterfaceUserTokensRepository";
import AppError from "@shared/errors/AppError";
import InterfaceHashProvider from "../provider/HashProvider/models/InterfaceHashProvider";

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: InterfaceUserTokensRepository,

    @inject("HashProvider")
    private hashProvider: InterfaceHashProvider
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists", 400, "user");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User token does not exists", 400, "user");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired", 400, "user");
    }

    user.password = await this.hashProvider.generatedHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;

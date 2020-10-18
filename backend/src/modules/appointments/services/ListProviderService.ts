import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import InterfaceUsersRepository from "@modules/users/repositories/InterfaceUsersRepository";

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;

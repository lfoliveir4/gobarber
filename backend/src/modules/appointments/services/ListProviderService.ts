import { classToClass } from "class-transformer";
import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import InterfaceUsersRepository from "@modules/users/repositories/InterfaceUsersRepository";
import IntefaceCacheProvider from "@shared/container/providers/CacheProvider/models/IntefaceCacheProvider";

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("CacheProvider")
    private cacheProvider: IntefaceCacheProvider
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    // clean cache
    //let users;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users)
      );
    }

    return users;
  }
}

export default ListProviderService;

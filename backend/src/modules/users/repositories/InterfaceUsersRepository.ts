import User from "../infra/typeorm/entities/User";

import InterfaceCreateUserDTO from "../dtos/InterfaceCreateUserDTO";
import IntefaceFindAllProviders from "../dtos/InterfaceFindAllProvidersDTO";

export default interface UsersRepository {
  findAllProviders(data: IntefaceFindAllProviders): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: InterfaceCreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

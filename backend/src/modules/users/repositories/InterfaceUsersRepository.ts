import User from "../infra/typeorm/entities/User";

import InterfaceCreateUserDTO from "../dtos/InterfaceCreateUserDTO";

export default interface UsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: InterfaceCreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

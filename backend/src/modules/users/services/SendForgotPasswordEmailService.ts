import { injectable, inject } from "tsyringe";

//import User from "@modules/users/infra/typeorm/entities/User";
//import AppError from "@shared/errors/AppError";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceMailProvider from "@shared/container/providers/MailProvider/models/InterfaceMailProvider";

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("MailProvider")
    private mailProvider: InterfaceMailProvider
  ) {}

  public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(
      email,
      "pedido de recuperação de senha recebido"
    );
  }
}

export default SendForgotPasswordEmailService;

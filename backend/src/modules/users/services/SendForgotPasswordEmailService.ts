import { injectable, inject } from "tsyringe";
import path from "path";

//import User from "@modules/users/infra/typeorm/entities/User";
//import AppError from "@shared/errors/AppError";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceUserTokensRepository from "../repositories/InterfaceUserTokensRepository";
import InterfaceMailProvider from "@shared/container/providers/MailProvider/models/InterfaceMailProvider";
import AppError from "@shared/errors/AppError";

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("MailProvider")
    private mailProvider: InterfaceMailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: InterfaceUserTokensRepository
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists", 400, "user");
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: "[Gobarber] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;

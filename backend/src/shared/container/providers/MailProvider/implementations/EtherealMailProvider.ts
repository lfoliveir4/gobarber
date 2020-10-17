import { injectable, inject } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import InterfaceMailProvider from "../models/InterfaceMailProvider";
import InterfaceSendMailDTO from "../dtos/InterfaceSendMailDTO";
import InterfaceMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider";

@injectable()
export default class EtherealMailProvider implements InterfaceMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: InterfaceMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: InterfaceSendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Go Barber",
        address: from?.email || "equipe@gobarber.com.br",
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

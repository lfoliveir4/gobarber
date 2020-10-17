import nodemailer, { Transporter } from "nodemailer";
import InterfaceMailProvider from "../models/InterfaceMailProvider";

export default class EtherealMailProvider implements InterfaceMailProvider {
  private client: Transporter;

  constructor() {
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

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Equipe Gobarber <equipe@gobarber.com.br>",
      to,
      subject: "Recuperação de senha",
      text: body,
      html: "<p><b>Hello</b> to myself!</p>",
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";
import { injectable, inject } from "tsyringe";
import InterfaceMailProvider from "../models/InterfaceMailProvider";
import InterfaceSendMailDTO from "../dtos/InterfaceSendMailDTO";
import InterfaceMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider";
import mailConfig from "@config/mail";

@injectable()
export default class SESMailProvider implements InterfaceMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: InterfaceMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: InterfaceSendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

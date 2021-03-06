import InterfaceSendMailDTO from "../dtos/InterfaceSendMailDTO";
import InterfaceMailProvider from "../models/InterfaceMailProvider";

export default class FakeMailProvider implements InterfaceMailProvider {
  private message: InterfaceSendMailDTO[] = [];

  public async sendMail(message: InterfaceSendMailDTO): Promise<void> {
    this.message.push(message);
  }
}

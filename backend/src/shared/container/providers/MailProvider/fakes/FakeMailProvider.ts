import InterfaceMailProvider from "../models/InterfaceMailProvider";
import IntefaceMailProvider from "../models/InterfaceMailProvider";

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements InterfaceMailProvider {
  private message: Message[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.message.push({
      to,
      body,
    });
  }
}

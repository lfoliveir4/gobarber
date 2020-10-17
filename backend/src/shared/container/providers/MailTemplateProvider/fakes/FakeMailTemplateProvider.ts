import InterfaceMailTemplateProvider from "../models/InterfaceMailTemplateProvider";
import InterfaceParseMailTemplate from "../dtos/InterfaceParseMailTemplateDTO";

class FakeMailTemplateProvider implements InterfaceMailTemplateProvider {
  public async parse(): Promise<string> {
    return "mail content";
  }
}

export default FakeMailTemplateProvider;

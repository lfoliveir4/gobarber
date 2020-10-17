import InterfaceMailTemplateProvider from "../models/InterfaceMailTemplateProvider";
import InterfaceParseMailTemplate from "../dtos/InterfaceParseMailTemplateDTO";

class FakeMailTemplateProvider implements InterfaceMailTemplateProvider {
  public async parse({
    template,
  }: InterfaceParseMailTemplate): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;

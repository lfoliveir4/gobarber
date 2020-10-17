import handlebars from "handlebars";
import InterfaceMailTemplateProvider from "../models/InterfaceMailTemplateProvider";
import InterfaceParseMailTemplate from "../dtos/InterfaceParseMailTemplateDTO";

class HandlebarsMailTemplateProvider implements InterfaceMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: InterfaceParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;

import InterfaceParseMailTemplateDTO from "../dtos/InterfaceParseMailTemplateDTO";

export default interface InterfaceMailProvider {
  parse(data: InterfaceParseMailTemplateDTO): Promise<string>;
}

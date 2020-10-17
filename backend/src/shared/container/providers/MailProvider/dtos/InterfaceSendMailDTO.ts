import InterfaceParseMailTemplateDTO from "@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO";

interface MailContact {
  name: string;
  email: string;
}

export default interface InterfaceSendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: InterfaceParseMailTemplateDTO;
}

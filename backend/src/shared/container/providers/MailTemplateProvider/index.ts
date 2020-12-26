import { container } from "tsyringe";
import mailConfig from "@config/mail";

import InterfaceMailTemplateProvider from "./models/InterfaceMailTemplateProvider";
import HandlebarsMailProvider from "./implementations/HandlebarsMailTemplateProvider";

const providers = {
  handlebars: HandlebarsMailProvider,
};

container.registerSingleton<InterfaceMailTemplateProvider>(
  "MailTemplateProvider",
  providers.handlebars
);

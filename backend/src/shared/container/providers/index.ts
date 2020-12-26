import { container } from "tsyringe";
import mailConfig from "@config/mail";

import InterfaceStorageProvider from "./StorageProvider/models/InterfaceStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";

import InterfaceMailProvider from "./MailProvider/models/InterfaceMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "./MailProvider/implementations/SESMailProvider";

import InterfaceMailTemplateProvider from "./MailTemplateProvider/models/InterfaceMailTemplateProvider";
import HandlebarsMailProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<InterfaceMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailProvider
);

container.registerInstance<InterfaceMailProvider>(
  "MailProvider",
  mailConfig.driver === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
);

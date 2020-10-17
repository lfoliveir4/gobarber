import { container } from "tsyringe";

import InterfaceStorageProvider from "./StorageProvider/models/InterfaceStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";

import InterfaceMailProvider from "./MailProvider/models/InterfaceMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

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
  container.resolve(EtherealMailProvider)
);

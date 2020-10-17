import { container } from "tsyringe";

import InterfaceStorageProvider from "./StorageProvider/models/InterfaceStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";

import InterfaceMailProvider from "./MailProvider/models/InterfaceMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerInstance<InterfaceMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);

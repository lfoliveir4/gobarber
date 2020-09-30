import { container } from "tsyringe";

import InterfaceStorageProvider from "./StorageProvider/models/InterfaceStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";

import InterfaceMailProvidero from "./MailProvider/models/InterfaceMailProvider";

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

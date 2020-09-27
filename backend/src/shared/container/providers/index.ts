import { container } from "tsyringe";

import InterfaceStorageProvider from "./StorageProvider/models/InterfaceStorageProvider";
import DiskStorageProvider from "./StorageProvider/Implementations/DiskStorageProvider";

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

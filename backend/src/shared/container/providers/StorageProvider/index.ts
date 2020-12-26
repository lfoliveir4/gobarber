import { container } from "tsyringe";

import InterfaceStorageProvider from "./models/InterfaceStorageProvider";
import DiskStorageProvider from "./Implementations/DiskStorageProvider";

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  providers.disk
);

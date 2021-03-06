import { container } from "tsyringe";
import uploadConfig from "@config/upload";

import InterfaceStorageProvider from "./models/InterfaceStorageProvider";
import DiskStorageProvider from "./Implementations/DiskStorageProvider";
import S3StorageProvider from "./Implementations/S3StorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<InterfaceStorageProvider>(
  "StorageProvider",
  providers[uploadConfig.driver]
);

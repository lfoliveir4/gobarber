import { container } from "tsyringe";

import InterfaceHashProvider from "./HashProvider/models/InterfaceHashProvider";
import BCriptyHashProvider from "./HashProvider/Implementations/BCryptHashProvider";

container.registerSingleton<InterfaceHashProvider>(
  "HashProvider",
  BCriptyHashProvider
);

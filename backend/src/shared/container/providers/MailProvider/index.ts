import { container } from "tsyringe";
import mailConfig from "@config/mail";

import InterfaceMailProvider from "./models/InterfaceMailProvider";

import EtherealMailProvider from "./implementations/EtherealMailProvider";
import SESMailProvider from "./implementations/SESMailProvider";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<InterfaceMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);

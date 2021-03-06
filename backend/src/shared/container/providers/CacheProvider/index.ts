import { container } from "tsyringe";

import IntefaceCacheProvider from "./models/IntefaceCacheProvider";
import RedisCacheProvider from "./implementations/RedisCacheProvider";

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<IntefaceCacheProvider>(
  "CacheProvider",
  providers.redis
);

import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";
import InterfaceCacheProvider from "../models/IntefaceCacheProvider";

interface InterfaceCacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements InterfaceCacheProvider {
  private cache: InterfaceCacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(prefix).filter((key) =>
      key.startsWith(`${prefix}:`)
    );

    keys.forEach((key) => delete this.cache[key]);
  }
}

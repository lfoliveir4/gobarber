import { hash, compare } from "bcryptjs";
import InterfaceHashProvider from "../models/InterfaceHashProvider";

class BCryptHashProvider implements InterfaceHashProvider {
  public async generatedHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;

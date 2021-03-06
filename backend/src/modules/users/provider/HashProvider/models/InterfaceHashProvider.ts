import { Generated } from "typeorm";

export default interface HashProvider {
  generatedHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}

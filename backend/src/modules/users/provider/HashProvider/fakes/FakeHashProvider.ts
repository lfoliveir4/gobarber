import InterfaceHashProvider from "../models/InterfaceHashProvider";

class FakeHashProvider implements InterfaceHashProvider {
  public async generatedHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;

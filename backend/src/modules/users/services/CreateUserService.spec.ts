import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "../services/CreateUserService";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";

import AppError from "@shared/errors/AppError";

describe("CreateUser", () => {
  it("shoud be able to create new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("shoud not be able to create new user with same email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

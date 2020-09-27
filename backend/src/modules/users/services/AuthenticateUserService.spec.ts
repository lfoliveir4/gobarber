import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "../services/AuthenticateUserService";
import CreateUserService from "../services/CreateUserService";

import AppError from "@shared/errors/AppError";

describe("Authenticate User", () => {
  it("shoud be able to authenticate", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );

    const user = await createUser.execute({
      name: "luis",
      email: "johndoe@example.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("shoud not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );

    expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );

    const user = await createUser.execute({
      name: "luis",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "../services/AuthenticateUserService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashRepository: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashRepository = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashRepository
    );
  });

  it("shoud be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
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
    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      name: "luis",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

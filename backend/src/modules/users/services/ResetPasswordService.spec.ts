import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/InterfaceUserTokensRepository";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";

import ResetPasswordEmailService from "../services/ResetPasswordService";

import AppError from "@shared/errors/AppError";
import FakeUserTokensRepostory from "../repositories/fakes/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepostory: FakeUserTokensRepostory;
let resetPassword: ResetPasswordEmailService;
let fakeHashProvider: FakeHashProvider;

describe("ResetPassword", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepostory = new FakeUserTokensRepostory();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepostory,
      fakeHashProvider
    );
  });

  it("shoud be able to reset password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Jhon Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const { token } = await fakeUserTokensRepostory.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generatedHash");

    await resetPassword.execute({
      password: "123123",
      token: token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  it("should not be able to reset password with non-wxisting token", async () => {
    await expect(
      resetPassword.execute({
        token: "nonexisting-token",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password with non-wxisting user", async () => {
    const { token } = await fakeUserTokensRepostory.generate(
      "non-existing-user"
    );

    await expect(
      resetPassword.execute({
        token,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password if pasted more then 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "Jhon Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const { token } = await fakeUserTokensRepostory.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: "123123",
        token: token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

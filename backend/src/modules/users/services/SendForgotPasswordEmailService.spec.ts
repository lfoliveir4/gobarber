import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUserTokensRepository from "../repositories/InterfaceUserTokensRepository";

import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

import AppError from "@shared/errors/AppError";
import FakeUserTokensRepostory from "../repositories/fakes/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepostory: FakeUserTokensRepostory;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepostory = new FakeUserTokensRepostory();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepostory
    );
  });

  it("shoud be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepository.create({
      name: "Jhon Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@gmail.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("shold not a be able to recover a non-existing user password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: "johndoe@gmail.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepostory, "generate");

    const user = await fakeUsersRepository.create({
      name: "Jhon Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@gmail.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

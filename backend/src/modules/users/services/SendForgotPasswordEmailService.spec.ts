import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

import AppError from "@shared/errors/AppError";

describe("SendForgotPasswordEmail", () => {
  it("shoud be able to recover the password using the email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

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
});

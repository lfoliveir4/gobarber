import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "../services/UpdateProfileService";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe("Update Profile ", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to update profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Luis Filipe Ronaldo",
      email: "lfronaldo@gmail.com",
    });

    expect(updatedUser.name).toBe("Luis Filipe Ronaldo");
    expect(updatedUser.email).toBe("lfronaldo@gmail.com");
  });

  it("should be able update profile non-existing user", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non-existing user-id",
        name: "Test",
        email: "jhon@doe.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update to change another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Jonh Doe",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Luis Filipe Ronaldo",
      email: "lfronaldo@gmail.com",
      old_password: "123456",
      password: "123123",
    });

    expect(updatedUser.password).toBe("123123");
  });

  it("should be able to update password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Luis Filipe Ronaldo",
        email: "lfronaldo@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Luis Filipe Ronaldo",
        email: "lfronaldo@gmail.com",
        old_password: "1234567",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

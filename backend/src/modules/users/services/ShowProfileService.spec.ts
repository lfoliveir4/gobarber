import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "../services/ShowProfileService";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe("Update Profile ", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it("should be able show profile user", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("John Doe");
    expect(profile.email).toBe("johndoe@example.com");
  });

  it("should be able show profile non-existing user", async () => {
    await expect(
      showProfile.execute({
        user_id: "non-existing user-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

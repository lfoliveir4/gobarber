import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

import AppError from "@shared/errors/AppError";

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );
  });

  it("shoud be able to create new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 10, 13),
      user_id: "123123",
      provider_id: "luis",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("luis");
  });

  it("shoud not be able two create new appointment on the same time", async () => {
    const appointmentDate = new Date(2020, 18, 10, 16);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: "123123",
      provider_id: "luis",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: "123123",
        provider_id: "luis",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able two create an appointments on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: "123123",
        provider_id: "luis",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able two create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: "123123",
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able two create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: "123123",
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able two create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: "123123",
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoud not be able two create an appointment before 8am and after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: "123123",
        provider_id: "provider-id",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: "123123",
        provider_id: "provider-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

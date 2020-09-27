import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import AppError from "@shared/errors/AppError";

describe("CreateAppointment", () => {
  it("shoud be able to create new appointment", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "luis",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("luis");
  });

  it("shoud not be able two create new appointment on the same time", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "luis",
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "luis",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

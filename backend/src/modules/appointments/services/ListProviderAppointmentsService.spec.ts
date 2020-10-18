import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import ListProviderAppointmentsService from "../services/ListProviderAppointmentsService";

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe("ListProviderAppointment ", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    );
  });

  it("should be able to list the appointments on a specific day", async () => {
    const createAppointment1 = await fakeAppointmentRepository.create({
      provider_id: "provider",
      user_id: "user",
      date: new Date(2020, 10, 19, 8, 0, 0),
    });

    const createAppointment2 = await fakeAppointmentRepository.create({
      provider_id: "provider",
      user_id: "user",
      date: new Date(2020, 10, 19, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: "provider",
      year: 2020,
      month: 11,
      day: 19,
    });

    expect(appointments).toEqual([createAppointment1, createAppointment2]);
  });
});

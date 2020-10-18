import AppError from "@shared/errors/AppError";
import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import ListProviderMonthAvailabilityService from "../services/ListProviderMonthAvailabilityService";

let listProvidersMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe("List Providers Month Availability ", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProvidersMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it("should be able to list the month availability from provider", async () => {
    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    );
  });
});

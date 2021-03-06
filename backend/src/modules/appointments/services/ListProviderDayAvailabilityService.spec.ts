import AppError from "@shared/errors/AppError";
import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import ListProviderDayAvailabilityService from "../services/ListProviderDayAvailabilityService";

let listProvidersDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe("List Providers Month Availability ", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it("should be able to list the day availability from provider", async () => {
    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 13, available: true },
      ])
    );
  });
});

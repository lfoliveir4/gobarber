import { inject, injectable } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import User from "@modules/users/infra/typeorm/entities/User";
import InterfaceAppointmentsRepository from "../repositories/InterfaceAppointmentsRepository";

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: InterfaceAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, year, month }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day
      );

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;

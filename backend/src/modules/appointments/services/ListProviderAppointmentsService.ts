import { inject, injectable } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";
import InterfaceAppointmentsRepository from "../repositories/InterfaceAppointmentsRepository";

interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: InterfaceAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;

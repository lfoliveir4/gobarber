import { inject, injectable } from "tsyringe";
import { classToClass } from "class-transformer";

import Appointment from "../infra/typeorm/entities/Appointment";
import InterfaceAppointmentsRepository from "../repositories/InterfaceAppointmentsRepository";

import IntefaceCacheProvider from "@shared/container/providers/CacheProvider/models/IntefaceCacheProvider";

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
    private appointmentsRepository: InterfaceAppointmentsRepository,

    @inject("CacheProvider")
    private cacheProvider: IntefaceCacheProvider
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}-${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day,
        }
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;

import { getRepository, Repository, Raw } from "typeorm";

import Appointment from "../entities/Appointment";

import IAppointmentsRepository from "@modules/appointments/repositories/InterfaceAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/InterfaceCreateAppointmentDTO";
import InterfaceFindAllInMonthProviderDTO from "@modules/appointments/dtos/InterfaceFindAllInMonthProviderDTO";

class AppointmentsRepostory implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: InterfaceFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepostory;

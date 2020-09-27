import { startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import InterfaceAppointmentsRepository from "@modules/appointments/repositories/InterfaceAppointmentsRepository";

import Appointment from "../infra/typeorm/entities/Appointment";

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: InterfaceAppointmentsRepository
  ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment alerady book", 400, "appointment");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

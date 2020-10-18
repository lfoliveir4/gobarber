import { startOfHour, isBefore, getHours } from "date-fns";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import InterfaceAppointmentsRepository from "@modules/appointments/repositories/InterfaceAppointmentsRepository";

import Appointment from "../infra/typeorm/entities/Appointment";

interface Request {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: InterfaceAppointmentsRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        "You can't create an appointment in the past date",
        400,
        "appointment"
      );
    }

    if (user_id === provider_id) {
      throw new AppError(
        "You can't create an appointment with yourself",
        400,
        "appointment"
      );
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't only create appointments between 8am and 5pm",
        400,
        "appointment"
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment alerady book", 400, "appointment");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

import { startOfHour, isBefore, getHours, format } from "date-fns";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import InterfaceAppointmentsRepository from "@modules/appointments/repositories/InterfaceAppointmentsRepository";
import InterfaceNotificationsRepository from "@modules/notifications/repositories/InterfaceNotificationsRepository";

import InterfaceCacheProvider from "@shared/container/providers/CacheProvider/models/IntefaceCacheProvider";

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
    private appointmentsRepository: InterfaceAppointmentsRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: InterfaceNotificationsRepository,

    @inject("CacheProvider")
    private cacheProvider: InterfaceCacheProvider
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
      appointmentDate,
      provider_id
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment alerady book", 400, "appointment");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'as' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        "yyyy-M-d"
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;

import { uuid } from "uuidv4";
import { isEqual, getDate, getMonth, getYear } from "date-fns";

import Appointment from "../../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "@modules/appointments/repositories/InterfaceAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/InterfaceCreateAppointmentDTO";
import InterfaceFindAllInMonthProviderDTO from "@modules/appointments/dtos/InterfaceFindAllInMonthProviderDTO";

class AppointmentsRepostory implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: InterfaceFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepostory;

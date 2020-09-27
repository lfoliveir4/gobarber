import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/InterfaceCreateAppointmentDTO";

interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}

export default IAppointmentsRepository;

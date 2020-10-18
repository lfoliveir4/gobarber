import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/InterfaceCreateAppointmentDTO";
import InterfaceFindAllInMonthProviderDTO from "@modules/appointments/dtos/InterfaceFindAllInMonthProviderDTO";

interface IAppointmentsRepository {
  findAllInMonthFromProvider(
    data: InterfaceFindAllInMonthProviderDTO
  ): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}

export default IAppointmentsRepository;

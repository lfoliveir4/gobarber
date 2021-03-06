import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/InterfaceCreateAppointmentDTO";
import InterfaceFindAllInMonthProviderDTO from "@modules/appointments/dtos/InterfaceFindAllInMonthProviderDTO";
import InterfaceFindAllInDayProviderDTO from "@modules/appointments/dtos/InterfaceFindAllInDayProviderDTO";

interface IAppointmentsRepository {
  findAllInMonthFromProvider(
    data: InterfaceFindAllInMonthProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: InterfaceFindAllInDayProviderDTO
  ): Promise<Appointment[]>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}

export default IAppointmentsRepository;

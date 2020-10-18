import InterfaceNotificationDTO from "../dtos/InterfaceNotificationDTO";
import Notification from "../infra/typeorm/schemas/Notification";

export default interface InterfaceNotificationsRepository {
  create(data: InterfaceNotificationDTO): Promise<Notification>;
}

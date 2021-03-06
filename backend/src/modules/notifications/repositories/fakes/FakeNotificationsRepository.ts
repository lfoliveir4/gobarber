import { ObjectID } from "mongodb";

import InterfaceNotificationsRepository from "@modules/notifications/repositories/InterfaceNotificationsRepository";
import InterfaceNotificationDTO from "@modules/notifications/dtos/InterfaceNotificationDTO";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";

class NotificationsRepository implements InterfaceNotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: InterfaceNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;

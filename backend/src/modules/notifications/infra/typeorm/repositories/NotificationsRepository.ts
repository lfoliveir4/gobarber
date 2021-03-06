import { getMongoRepository, MongoRepository } from "typeorm";

import InterfaceNotificationsRepository from "@modules/notifications/repositories/InterfaceNotificationsRepository";
import InterfaceNotificationDTO from "@modules/notifications/dtos/InterfaceNotificationDTO";
import Notification from "../schemas/Notification";

class NotificationsRepository implements InterfaceNotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, "mongo");
  }

  public async create({
    content,
    recipient_id,
  }: InterfaceNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;

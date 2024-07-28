import {
  IBaseNotificationDTO,
  INotificationFetchDTO,
} from "src/interfaces/dtos/NotificationDTO";
import { Timekoto } from "timekoto";

class BaseNotificationDTO implements IBaseNotificationDTO {
  _id: string | null;
  sender: string | null;
  senderName: string;
  senderImage: string;
  receiver: string | null;
  entityId: string | null;
  message: string;
  type: string;
  createdAt: Date;

  constructor(notification: Partial<IBaseNotificationDTO>) {
    this._id = notification._id || null;
    this.sender = notification.sender || null;
    this.senderName = notification.senderName || "";
    this.senderImage = notification.senderImage || "";
    this.receiver = notification.receiver || null;
    this.entityId = notification.entityId || null;
    this.message = notification.message || "";
    this.type = notification.type || "";
    this.createdAt = notification.createdAt || new Date(Timekoto());
  }
}

class NotificationFetchDTO
  extends BaseNotificationDTO
  implements INotificationFetchDTO
{
  constructor(notification: Partial<INotificationFetchDTO>) {
    super(notification);
  }
}

export { BaseNotificationDTO, NotificationFetchDTO };

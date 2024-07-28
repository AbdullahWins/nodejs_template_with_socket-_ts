// Define interfaces
interface IBaseNotificationDTO {
  _id: string | null;
  sender: string | null;
  senderName: string;
  senderImage: string;
  receiver: string | null;
  entityId: string | null;
  message: string;
  type: string;
  createdAt: Date;
}

interface INotificationFetchDTO extends IBaseNotificationDTO {}

export { IBaseNotificationDTO, INotificationFetchDTO };

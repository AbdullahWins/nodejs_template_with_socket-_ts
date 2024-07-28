// Define a base interface for common fields

import { GroupFetchDTO } from "src/dtos/ChatDTO";
import { UserChatDTO } from "src/dtos/UserDTO";

interface BaseDTO {
  _id: string | null;
  name?: string;
  createdAt: Date | null;
}

// Define specific DTO interfaces
interface IGroupChatDTO extends BaseDTO {
  users: UserChatDTO[];
}

interface IChatFetchDTO extends BaseDTO {
  sender: UserChatDTO | null;
  receiver: UserChatDTO | null;
  group: GroupFetchDTO | null;
  message: string;
  isGroupChat: boolean;
}

interface IIndividualChatFetchDTO extends BaseDTO {
  message: string;
  attachment: string;
  isMine: boolean;
}

export { IGroupChatDTO, IChatFetchDTO, IIndividualChatFetchDTO };

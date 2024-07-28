// DTOs/adminDTO.ts
import { UserChatDTO } from "./UserDTO";

// Define a base interface for common fields
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
  sender?: { _id: string };
}

// Implement DTO classes
class GroupChatDTO implements IGroupChatDTO {
  _id: string | null;
  name: string;
  users: UserChatDTO[];
  createdAt: Date | null;

  constructor(group: Partial<IGroupChatDTO>) {
    this._id = group._id || null;
    this.name = group.name || "";
    this.users = group.users?.map((user) => new UserChatDTO(user)) || [];
    this.createdAt = group.createdAt || null;
  }
}

class GroupFetchDTO implements BaseDTO {
  _id: string | null;
  name: string;
  createdAt: Date | null;

  constructor(group: Partial<BaseDTO>) {
    this._id = group._id || null;
    this.name = group.name || "";
    this.createdAt = group.createdAt || null;
  }
}

class ClubFetchDTO extends GroupFetchDTO {}
class EventFetchDTO extends GroupFetchDTO {}

class ChatFetchDTO implements IChatFetchDTO {
  _id: string | null;
  sender: UserChatDTO | null;
  receiver: UserChatDTO | null;
  group: GroupFetchDTO | null;
  message: string;
  isGroupChat: boolean;
  createdAt: Date | null;

  constructor(chat: Partial<IChatFetchDTO>) {
    this._id = chat._id || null;
    this.sender = chat.sender ? new UserChatDTO(chat.sender) : null;
    this.receiver = chat.receiver ? new UserChatDTO(chat.receiver) : null;
    this.group = chat.group ? new GroupFetchDTO(chat.group) : null;
    this.message = chat.message || "";
    this.isGroupChat = chat.isGroupChat || false;
    this.createdAt = chat.createdAt || null;
  }
}

class IndividualChatFetchDTO implements IIndividualChatFetchDTO {
  _id: string | null;
  message: string;
  attachment: string;
  isMine: boolean;
  createdAt: Date | null;

  constructor(userId: string, chat: Partial<IIndividualChatFetchDTO>) {
    this._id = chat._id || null;
    this.message = chat.message || "";
    this.attachment = chat.attachment || "";
    this.isMine = chat.sender?._id === userId;
    this.createdAt = chat.createdAt || null;
  }
}

class GroupChatFetchDTO extends ChatFetchDTO {}
class ClubChatFetchDTO extends ChatFetchDTO {}
class EventChatFetchDTO extends ChatFetchDTO {}

export {
  GroupChatDTO,
  GroupFetchDTO,
  ClubFetchDTO,
  EventFetchDTO,
  ChatFetchDTO,
  IndividualChatFetchDTO,
  GroupChatFetchDTO,
  ClubChatFetchDTO,
  EventChatFetchDTO,
};

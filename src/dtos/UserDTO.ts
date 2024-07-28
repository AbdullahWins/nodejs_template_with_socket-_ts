// UserDTO.ts

import {
  IUserDTO,
  IUserFriendlistDTO,
  IUserWithFriendshipStatusDTO,
  IUserLastChatDTO,
} from "../interfaces";

export class UserFriendlistDTO implements IUserFriendlistDTO {
  _id: string | null;
  username: string;
  fullName: string;
  gender: string;
  hobbyList: string[];
  profileImage: string;
  coverImage: string;
  currentTown: string;

  constructor(user: Partial<IUserFriendlistDTO>) {
    this._id = user._id || null;
    this.username = user.username || "";
    this.fullName = user.fullName || "";
    this.gender = user.gender || "";
    this.hobbyList = user.hobbyList || [];
    this.profileImage = user.profileImage || "";
    this.coverImage = user.coverImage || "";
    this.currentTown = user.currentTown || "";
  }
}

export class UserDTO implements IUserDTO {
  _id: string | null;
  username: string;
  email: string;
  fullName: string;
  birthDay: string;
  gender: string;
  bio: string;
  hometown: string;
  currentTown: string;
  currentLocation: Record<string, unknown>;
  yearsOfMoving: string;
  occupation: string;
  profileImage: string;
  coverImage: string;
  hobbyList: string[];
  friendsList: { userId: IUserFriendlistDTO; status: string }[];

  constructor(user: Partial<IUserDTO>) {
    this._id = user._id || null;
    this.username = user.username || "";
    this.email = user.email || "";
    this.fullName = user.fullName || "";
    this.birthDay = user.birthDay || "";
    this.gender = user.gender || "";
    this.bio = user.bio || "";
    this.hometown = user.hometown || "";
    this.currentTown = user.currentTown || "";
    this.currentLocation = user.currentLocation || {};
    this.yearsOfMoving = user.yearsOfMoving || "";
    this.occupation = user.occupation || "";
    this.profileImage = user.profileImage || "";
    this.coverImage = user.coverImage || "";
    this.hobbyList = user.hobbyList || [];
    this.friendsList =
      user.friendsList?.map((friend) => ({
        userId: new UserFriendlistDTO(friend.userId),
        status: friend.status,
      })) || [];
  }
}

export class UserWithFriendshipStatusDTO
  extends UserDTO
  implements IUserWithFriendshipStatusDTO
{
  friendshipStatus: string | null;

  constructor(user: Partial<IUserWithFriendshipStatusDTO>) {
    super(user);
    this.friendshipStatus = user.friendshipStatus || null;
  }
}

export class UserLastChatDTO implements IUserLastChatDTO {
  _id: string | null;
  username: string;
  email: string;
  fullName: string;
  birthDay: string;
  gender: string;
  bio: string;
  hometown: string;
  currentTown: string;
  currentLocation: Record<string, unknown>;
  yearsOfMoving: string;
  occupation: string;
  profileImage: string;
  coverImage: string;
  hobbyList: string[];
  friendsList: { userId: IUserFriendlistDTO; status: string }[];
  message: string;
  attachment: string;
  isMine: boolean;
  createdAt: Date | null;

  constructor(user: Partial<IUserDTO>, lastMessage: Partial<IUserLastChatDTO>) {
    this._id = user._id || null;
    this.username = user.username || "";
    this.email = user.email || "";
    this.fullName = user.fullName || "";
    this.birthDay = user.birthDay || "";
    this.gender = user.gender || "";
    this.bio = user.bio || "";
    this.hometown = user.hometown || "";
    this.currentTown = user.currentTown || "";
    this.currentLocation = user.currentLocation || {};
    this.yearsOfMoving = user.yearsOfMoving || "";
    this.occupation = user.occupation || "";
    this.profileImage = user.profileImage || "";
    this.coverImage = user.coverImage || "";
    this.hobbyList = user.hobbyList || [];
    this.friendsList =
      user.friendsList?.map((friend) => ({
        userId: new UserFriendlistDTO(friend.userId),
        status: friend.status,
      })) || [];
    this.message = lastMessage.message || "";
    this.attachment = lastMessage.attachment || "";
    this.isMine = lastMessage.isMine || false;
    this.createdAt = lastMessage.createdAt || null;
  }
}

export class UserLoginDTO extends UserDTO {}
export class UserRegisterDTO extends UserDTO {}
export class UserFetchDTO extends UserDTO {}
export class UserUpdateDTO extends UserDTO {}
export class UserDeleteDTO extends UserDTO {}
export class UserPostDTO extends UserDTO {}
export class UserJobDTO extends UserDTO {}
export class UserGroupDTO extends UserDTO {}
export class UserEventDTO extends UserDTO {}
export class UserClubDTO extends UserDTO {}
export class UserChatDTO extends UserDTO {}
export class UserMeetingDTO extends UserDTO {}

// interfaces.ts

interface IUserFriendlistDTO {
  _id: string | null;
  username: string;
  fullName: string;
  gender: string;
  hobbyList: string[];
  profileImage: string;
  coverImage: string;
  currentTown: string;
}

interface IUserDTO {
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
}

interface IUserLastChatDTO extends IUserDTO {
  message: string;
  attachment: string;
  isMine: boolean;
  createdAt: Date | null;
}

interface IUserWithFriendshipStatusDTO extends IUserDTO {
  friendshipStatus: string | null;
}

export {
  IUserDTO,
  IUserLastChatDTO,
  IUserFriendlistDTO,
  IUserWithFriendshipStatusDTO,
};

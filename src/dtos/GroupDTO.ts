import { IGroupDTO, IGroupGetDTO } from "src/interfaces/dtos/GroupDTO";
import { UserGroupDTO } from "./UserDTO";

// Implement DTO classes
class GroupDTO implements IGroupDTO {
  _id: string | null;
  owner: UserGroupDTO | null;
  name: string;
  coverImage: string;
  description: string;
  members: UserGroupDTO[];
  isJoined: boolean;
  memberCount: number;
  createdAt: Date | null;

  constructor(group: Partial<IGroupDTO>) {
    this._id = group._id || null;
    this.owner = group.owner ? new UserGroupDTO(group.owner) : null;
    this.name = group.name || "";
    this.coverImage = group.coverImage || "";
    this.description = group.description || "";
    this.members =
      group.members?.map((member) => new UserGroupDTO(member)) || [];
    this.isJoined = group.isJoined || false;
    this.memberCount = group.memberCount || 0;
    this.createdAt = group.createdAt || null;
  }
}

class GroupGetDTO implements IGroupGetDTO {
  _id: string | null;
  owner: UserGroupDTO | null;
  name: string;
  coverImage: string;
  description: string;
  members: UserGroupDTO[];
  createdAt: Date | null;

  constructor(group: Partial<IGroupGetDTO>) {
    this._id = group._id || null;
    this.owner = group.owner ? new UserGroupDTO(group.owner) : null;
    this.name = group.name || "";
    this.coverImage = group.coverImage || "";
    this.description = group.description || "";
    this.members =
      group.members?.map((member) => new UserGroupDTO(member)) || [];
    this.createdAt = group.createdAt || null;
  }
}

export { GroupDTO, GroupGetDTO };

// DTOs/adminDTO.ts
import { IAdminDTO } from "../interfaces";

class BaseAdminDTO implements IAdminDTO {
  _id: string | null;
  fullName: string;
  email: string;
  profileImage: string;

  constructor(admin?: Partial<IAdminDTO>) {
    this._id = admin?._id || null;
    this.fullName = admin?.fullName || "";
    this.email = admin?.email || "";
    this.profileImage = admin?.profileImage || "";
  }
}

class AdminLoginDTO extends BaseAdminDTO {
  constructor(admin?: Partial<IAdminDTO>) {
    super(admin);
  }
}

class AdminRegisterDTO extends BaseAdminDTO {
  constructor(admin?: Partial<IAdminDTO>) {
    super(admin);
    this.fullName = admin?.fullName || "";
    this.email = admin?.email || "";
    this.profileImage = admin?.profileImage || "";
  }
}

class AdminFetchDTO extends BaseAdminDTO {
  constructor(admin?: Partial<IAdminDTO>) {
    super(admin);
  }
}

class AdminUpdateDTO extends BaseAdminDTO {
  constructor(admin?: Partial<IAdminDTO>) {
    super(admin);
  }
}

class AdminDeleteDTO extends BaseAdminDTO {
  constructor(admin?: Partial<IAdminDTO>) {
    super(admin);
  }
}

export {
  AdminLoginDTO,
  AdminRegisterDTO,
  AdminFetchDTO,
  AdminUpdateDTO,
  AdminDeleteDTO,
};

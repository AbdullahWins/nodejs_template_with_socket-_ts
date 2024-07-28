// DTOs/AuthDTO.ts
import { IAuthDTO } from "../interfaces";

class AuthDTO implements IAuthDTO {
  _id: string | null;
  fullName: string;
  email: string;
  role: string;

  constructor(auth?: Partial<IAuthDTO>) {
    this._id = auth?._id || null;
    this.fullName = auth?.fullName || "";
    this.email = auth?.email || "";
    this.role = auth?.role || "";
  }
}

export { AuthDTO, IAuthDTO };

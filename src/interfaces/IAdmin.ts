// src/interfaces/IAdmin.ts

import { Document, Model } from "mongoose";
import {
  AdminLoginDTO,
  AdminRegisterDTO,
  AdminUpdateDTO,
  AdminFetchDTO,
} from "../dtos/AdminDTO";

interface IAdmin extends Document {
  email: string;
  fullName: string;
  password: string;
  profileImage: string;
  createdAt: number;
}

interface IAdminModel extends Model<IAdmin> {
  getAllAdmins(): Promise<AdminFetchDTO[]>;
  getOneAdmin(id: string): Promise<AdminFetchDTO>;
  login(
    email: string,
    password: string
  ): Promise<{ accessToken: string } & AdminLoginDTO>;
  register(
    fullName: string,
    email: string,
    password: string
  ): Promise<{ accessToken: string } & AdminRegisterDTO>;
  updateAdminById(
    id: string,
    updatedData: Partial<IAdmin>
  ): Promise<AdminUpdateDTO>;
  updatePasswordByOTP(
    email: string,
    otp: string,
    newPassword: string
  ): Promise<AdminUpdateDTO>;
  updatePasswordByEmail(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<AdminUpdateDTO>;
  deleteAdminById(id: string): Promise<{ message: string }>;
}

export { IAdmin, IAdminModel };

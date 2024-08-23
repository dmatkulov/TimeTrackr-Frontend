import { Position } from './types.position';

export interface User {
  _id: string;
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  photo: string;
  companyID: string;
  position: Position;
  roles: string[];
  googleID?: string;
}

export interface RegisterMutation {
  email: string;
  firstname: string;
  companyID: string;
  lastname: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface UserMutation {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string | null;
  photo: File | null | string;
}

export interface UserPhoto {
  photo: File | null | string;
}

export interface UpdateUserArg {
  id: string;
  mutation: UserMutation;
}

export interface UpdatePhotoArg {
  id: string;
  mutation: UserPhoto;
}

export interface UserQueryValues {
  positions?: string[];
  email?: string;
  lastname?: string;
}

export interface UserQueryParams {
  positions?: string;
  email?: string;
  lastname?: string;
}

export interface StaffData {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  photo: string;
}

export interface UserSummary {
  _id: string;
  photo: string;
  firstname: string;
  lastname: string;
  position: Position;
}

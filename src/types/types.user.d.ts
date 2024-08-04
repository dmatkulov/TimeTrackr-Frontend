import { Position } from './types.position';

export interface User {
  _id: string;
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  photo: string;
  position: Position;
  role: string;
  googleID?: string;
}

export interface StaffData {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  photo: string;
  position: Position;
}

export interface ContactInfo {
  mobile: string;
  city: string;
  street: string;
}

export interface Author {
  _id: string;
  photo: string;
  firstname: string;
  lastname: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface UserMutation {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  photo: File | null | string;
  position: string;
  password?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface UpdateUserArg {
  id: string;
  mutation: UserMutation;
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

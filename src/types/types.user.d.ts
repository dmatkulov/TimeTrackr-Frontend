import { Position } from './types.position';

export interface User {
  _id: string;
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  contactInfo: contactInfo;
  photo: string;
  position: Position;
  role: string;
  startDate: string;
}
export interface StaffData {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  photo: string;
  position: Position;
}
export interface contactInfo {
  mobile: string;
  city: string;
  street: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation {
  email: string;
  firstname: string;
  lastname: string;
  contactInfo: contactInfo;
  photo: File | null;
  position: string;
  startDate: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface UsersResponse {
  message: string;
  users: User[];
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

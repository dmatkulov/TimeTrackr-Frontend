export interface User {
  _id: string;
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  contactInfo;
  photo: string;
  position: string;
  role: string;
  startDate: string;
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

export interface RegisterMutation {}

export interface UserResponse {
  message: string;
  user: User;
}

export interface UsersResponse {
  message: string;
  users: User[];
}

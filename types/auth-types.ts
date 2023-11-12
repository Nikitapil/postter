export interface IRegisterData {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  name: string;
  about: string;
  profileImage?: File | null;
}

export interface IEditUserData {
  username: string;
  email: string;
  name: string;
  about: string;
  profileImage?: File | null;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IUser {
  email: string;
  id: string;
  name: string | null;
  profileImage: string | null;
  username: string;
  about: string;
}

export interface IJwtDecodedToken {
  exp: number;
  iat: number;
}

export interface IEditUserResponse {
  user: IUser;
}

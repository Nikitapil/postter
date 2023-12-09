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

export interface IChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
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
  createdAt: string;
  followedByCount?: number;
  followingCount?: number;
  isFollowedByCurrent?: boolean;
  canFollow: boolean;
}

export interface IJwtDecodedToken {
  exp: number;
  iat: number;
}

export interface IEditUserResponse {
  user: IUser;
}

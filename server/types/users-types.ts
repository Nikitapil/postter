import { z } from 'zod';

export interface ICreateUserData {
  email: string;
  name?: string;
  username: string;
  password: string;
  repeatPassword: string;
  profileImage?: string;
  about: string;
}

export interface IEditUserData {
  userId: string;
  username: string;
  email: string;
  name: string;
  profileImage: string;
  about: string;
}

export interface IUserDataFiltered {
  id: string;
  email: string;
  name: string | null;
  username: string;
  profileImage: string | null;
  about: string;
  createdAt: Date | string;
}

export interface ILoginApiData {
  username: string;
  password: string;
}

export interface IGetProfile {
  profileId: string;
}

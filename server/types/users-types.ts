export interface ICreateUserData {
  email: string;
  name?: string;
  username: string;
  password: string;
  repeatPassword: string;
  profileImage?: string;
}

export interface IUserFormDb {
  id: string;
  email: string;
  name: string | null;
  username: string;
  password: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDataFiltered {
  id: string;
  email: string;
  name: string | null;
  username: string;
  profileImage: string | null;
}

export interface ILoginApiData {
  username: string;
  password: string;
}

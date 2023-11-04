export interface ICreateUserData {
  email: string;
  name?: string;
  username: string;
  password: string;
  repeatPassword: string;
  profileImage?: string;
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

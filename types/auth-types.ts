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
}

export interface IJwtDecodedToken {
    exp: number;
    iat: number;
}
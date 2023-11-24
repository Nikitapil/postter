import { IPaginationParams } from '~/server/types/common';

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
  followedByCount?: number;
  followingCount?: number;
  isFollowedByCurrent?: boolean;
}

export interface ISafeUserFromDb {
  id: string;
  email: string;
  name: string | null;
  username: string;
  profileImage: string | null;
  about: string;
  createdAt: Date | string;
  _count?: {
    followedBy: number;
    following: number;
  };
  followedBy?: ISafeUserFromDb[];
}

export interface ILoginApiData {
  username: string;
  password: string;
}

export interface IGetProfile {
  profileId: string;
  currentUserId: string;
}

export interface IFollowUserParams {
  followByUserId: string;
  followToUserId: string;
}

export interface IGetFollowUsersListQuery {
  profileId: string;
  filter: 'followers' | 'following';
  page?: number;
  limit?: number;
}

export interface IGetFollowUsersList extends IGetFollowUsersListQuery {
  currentUserId: string;
}

export interface IGetTopUsersParams extends IPaginationParams {
  currentUserId: string;
}

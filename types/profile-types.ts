import { IUser } from '~/types/auth-types';

export interface IGetProfileResponse {
  profile: IUser;
}

export interface IFollowResponse {
  isFollowedByCurrent: boolean;
}

export enum EUserFollowListFilter {
  FOLLOWERS = 'followers',
  FOLLOWING = 'following'
}

export interface IGetUserFollowListParams {
  profileId: string;
  filter: EUserFollowListFilter;
  isInitial: boolean;
}

export interface IGetUserFollowListResponse {
  users: IUser[];
  totalCount: number;
}

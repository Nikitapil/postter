import { IUser } from '~/types/auth-types';

export interface IGetProfileResponse {
  profile: IUser;
}

export interface IFollowResponse {
  isFollowedByCurrent: boolean;
}

export interface IGetUserFollowListParams {
  profileId: string;
  filter: 'followers' | 'following';
  isInitial: boolean;
}

export interface IGetUserFollowListResponse {
  users: IUser[];
  totalCount: number;
}

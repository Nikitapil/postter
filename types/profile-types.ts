import { IUser } from '~/types/auth-types';

export interface IGetProfileResponse {
  profile: IUser;
}

export interface IFollowResponse {
  isFollowedByCurrent: boolean;
}

import { IUser } from '~/types/auth-types';
import { IFollowResponse } from '~/types/profile-types';

export const useFollows = () => {
  const toggleFollow = async (user: IUser) => {
    try {
      const { isFollowedByCurrent } = await useFetchApi<IFollowResponse>(
        '/api/user/follow',
        {
          method: 'PUT',
          body: { followToUserId: user.id }
        }
      );
      user.isFollowedByCurrent = isFollowedByCurrent;
      if (user.followedByCount !== undefined) {
        if (isFollowedByCurrent) {
          user.followedByCount++;
        } else {
          user.followedByCount--;
        }
      }
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while toggle follow');
    }
  };

  return { toggleFollow };
};

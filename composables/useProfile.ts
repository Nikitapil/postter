import { IUser } from '~/types/auth-types';
import { IGetProfileResponse } from '~/types/profile-types';

export default () => {
  const profile = ref<IUser | null>(null);

  const getProfile = async (profileId: string) => {
    try {
      const response = await useFetchApi<IGetProfileResponse>(
        '/api/user/profile',
        {
          method: 'GET',
          params: { profileId }
        }
      );
      profile.value = response.profile;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while getting profile');
    }
  };

  return { profile, getProfile };
};

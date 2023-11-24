import { IUser } from '~/types/auth-types';
import {
  IGetTopUsersParams,
  IGetUserFollowListParams,
  IGetUserFollowListResponse
} from '~/types/profile-types';

const USERS_LIMIT = 50;

export const useUsersList = () => {
  const usersList = ref<IUser[]>([]);
  const totalCountUsers = ref(0);

  const currentPage = computed(() =>
    Math.floor(usersList.value.length / USERS_LIMIT)
  );

  const getUserFollowList = async ({
    profileId,
    filter,
    isInitial
  }: IGetUserFollowListParams) => {
    try {
      if (!isInitial && usersList.value.length >= totalCountUsers.value) {
        return;
      }

      const { users, totalCount } =
        await useFetchApi<IGetUserFollowListResponse>(
          '/api/user/follow-user-list',
          {
            method: 'GET',
            params: {
              profileId,
              filter,
              page: isInitial ? 1 : currentPage.value + 1,
              limit: USERS_LIMIT
            }
          }
        );

      if (isInitial) {
        usersList.value = users;
        totalCountUsers.value = totalCount;
      } else {
        usersList.value.push(...users);
      }
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while getting top posts');
    }
  };

  const getTopUserList = async ({ limit, isInitial }: IGetTopUsersParams) => {
    if (!isInitial && usersList.value.length >= totalCountUsers.value) {
      return;
    }

    try {
      const { users, totalCount } =
        await useFetchApi<IGetUserFollowListResponse>('/api/user/top', {
          method: 'GET',
          params: {
            page: isInitial ? 1 : currentPage.value + 1,
            limit: limit || USERS_LIMIT
          }
        });

      if (isInitial) {
        usersList.value = users;
        totalCountUsers.value = totalCount;
      } else {
        usersList.value.push(...users);
      }
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error while getting top posts');
    }
  };

  return { usersList, getUserFollowList, getTopUserList };
};

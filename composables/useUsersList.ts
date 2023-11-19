import { IUser } from '~/types/auth-types';
import {
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

  const getUserFollowListInitial = async ({
    profileId,
    filter,
    isInitial
  }: IGetUserFollowListParams) => {
    if (!isInitial && usersList.value.length >= totalCountUsers.value) {
      return;
    }

    const { users, totalCount } = await useFetchApi<IGetUserFollowListResponse>(
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
  };

  return { usersList, getUserFollowListInitial };
};

import { IUser } from '~/types/auth-types';
import {
  IGetUsersParams,
  IGetUserFollowListParams,
  IGetUserFollowListResponse
} from '~/types/profile-types';

const USERS_LIMIT = 50;

export default () => {
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

  const getUsersList = async ({
    limit,
    isInitial,
    search
  }: IGetUsersParams) => {
    if (!isInitial && usersList.value.length >= totalCountUsers.value) {
      return;
    }

    try {
      const { users, totalCount } =
        await useFetchApi<IGetUserFollowListResponse>('/api/user/list', {
          method: 'GET',
          params: {
            page: isInitial ? 1 : currentPage.value + 1,
            limit: limit || USERS_LIMIT,
            search: search || ''
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
      $toast.error(e?.statusMessage || 'Error while getting users');
    }
  };

  return { usersList, getUserFollowList, getUsersList };
};

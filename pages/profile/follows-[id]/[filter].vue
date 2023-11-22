<template>
  <UserList
    :loading="isUsersLoading"
    :users="usersList"
  />
</template>

<script setup lang="ts">
import { EUserFollowListFilter } from '~/types/profile-types';

const route = useRoute();
const { usersList, getUserFollowList } = useUsersList();

const isUsersLoading = ref(false);

const profileId = computed(() => route.params.id as string);
const filter = computed(() => route.params.filter as EUserFollowListFilter);

const onLoadMorePosts = async () => {
  await getUserFollowList({
    profileId: profileId.value,
    filter: filter.value,
    isInitial: false
  });
};

onMounted(async () => {
  if (
    filter.value !== EUserFollowListFilter.FOLLOWERS &&
    filter.value !== EUserFollowListFilter.FOLLOWING
  ) {
    showError('Page not found');
    return;
  }
  isUsersLoading.value = true;
  await getUserFollowList({
    profileId: profileId.value,
    filter: filter.value,
    isInitial: true
  });
  isUsersLoading.value = false;
});
</script>

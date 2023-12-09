<template>
  <PreviewCardItem @click="openUser">
    <div class="flex justify-between items-center p-2">
      <div class="flex">
        <UserAvatar :link="user.profileImage" />

        <div class="flex flex-col ml-2">
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ user.name }}
          </h2>
          <p class="text-xs text-gray-400">@{{ user.username }}</p>
        </div>
      </div>

      <div
        v-if="user.canFollow"
        class="flex h-full"
      >
        <button
          class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full hover:opacity-75 disabled:opacity-50"
          :disabled="isFollowToggleInProgress"
          @click.stop="onClickFollow"
        >
          {{ followBtnText }}
        </button>
      </div>
    </div>
  </PreviewCardItem>
</template>
<script setup lang="ts">
import UserAvatar from '~/components/ui/UserAvatar.vue';
import { IUser } from '~/types/auth-types';
import PreviewCardItem from '~/components/PreviewCard/PreviewCardItem.vue';

const props = defineProps<{
  user: IUser;
}>();

const { toggleFollow } = useFollows();
const isFollowToggleInProgress = ref(false);

const openUser = () => {
  navigateTo(`/profile/${props.user.id}`);
};

const followBtnText = computed(() =>
  props.user.isFollowedByCurrent ? 'Unfollow' : 'Follow'
);

const onClickFollow = async () => {
  isFollowToggleInProgress.value = true;
  await toggleFollow(props.user);
  isFollowToggleInProgress.value = false;
};
</script>

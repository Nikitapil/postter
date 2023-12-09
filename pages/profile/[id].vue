<template>
  <MainSection :loading="isPageLoading">
    <Head>
      <Title>Profile / Postter</Title>
    </Head>

    <template #title>
      <div
        v-if="profile"
        class="flex items-start gap-2"
      >
        <div class="flex gap-2 items-center">
          <UserAvatar :link="profile.profileImage" />
          <span>{{ profile.name }}</span>
        </div>
        <NuxtLink
          v-if="isMyUser"
          to="/profile/edit"
          class="profileHeaderButton"
        >
          Edit Profile
        </NuxtLink>
        <div
          v-else
          class="ml-auto"
        >
          <button
            class="profileHeaderButton"
            :disabled="isFollowToggleInProgress"
            @click="onClickFollow"
          >
            {{ profileFollowButtonText }}
          </button>
          <button
            class="profileHeaderButton block mt-2"
            @click="onOpenMessagesModal"
          >
            Message
          </button>
        </div>
      </div>
    </template>

    <template v-if="profile">
      <div class="px-4 border-b pb-4">
        <div class="flex gap-4 text-gray-400 mb-2">
          <p>@{{ profile.username }}</p>
          <p class="flex items-center gap-1">
            <CalendarDaysIcon class="w-5 h-5" />
            registered at {{ registeredDateText }}
          </p>
        </div>

        <p class="dark:text-gray-200 mb-2">
          {{ profile.about }}
        </p>

        <div class="flex gap-3">
          <NuxtLink
            class="link-gray"
            :to="followersLink"
          >
            {{ profile.followedByCount }} followers
          </NuxtLink>
          <NuxtLink
            class="link-gray"
            :to="followingLink"
          >
            {{ profile.followingCount }} following
          </NuxtLink>
        </div>
      </div>

      <ListFeed
        :posts="posts"
        @feed-end="loadMorePosts"
      />

      <MessagesModal
        :is-open="isMessageModalOpened"
        :user-to="profile"
        @close-modal="onCloseMessagesModal"
      />
    </template>

    <div
      v-else
      class="flex flex-col items-center"
    >
      <div class="w-20 h-20 dark:text-white">
        <NoSymbolIcon />
      </div>
      <h2 class="text-center text-xl font-bold dark:text-white">
        Profile not found
      </h2>
    </div>
  </MainSection>
</template>

<script setup lang="ts">
import UserAvatar from '~/components/ui/UserAvatar.vue';
import { CalendarDaysIcon } from '@heroicons/vue/24/solid';
import { NoSymbolIcon } from '@heroicons/vue/24/solid';
import ListFeed from '~/components/posts/ListFeed.vue';
import MessagesModal from '~/components/Chat/MessagesModal.vue';

const { useAuthUser } = useAuth();
const user = useAuthUser();

const { getProfile, profile } = useProfile();
const { getPosts, posts } = usePostsFeed();
const { toggleFollow } = useFollows();

const route = useRoute();

const isPageLoading = ref(true);
const isFollowToggleInProgress = ref(false);
const isMessageModalOpened = ref(false);

const profileId = computed(() => route.params.id as string);

const registeredDateText = computed(() =>
  profile.value ? new Date(profile.value.createdAt).toLocaleDateString() : ''
);

const isMyUser = computed(() => user.value?.id === profileId.value);

const profileFollowButtonText = computed(() =>
  profile.value?.isFollowedByCurrent ? 'Unfollow' : 'Follow'
);

const followersLink = computed(
  () => `/profile/follows-${profileId.value}/followers`
);
const followingLink = computed(
  () => `/profile/follows-${profileId.value}/following`
);

const onClickFollow = () => {
  if (profile.value) {
    isFollowToggleInProgress.value = true;
    toggleFollow(profile.value);
    isFollowToggleInProgress.value = false;
  }
};

const loadMorePosts = async () => {
  await getPosts({
    profileId: profileId.value,
    isInitial: false
  });
};

const loadPostsInitial = async () => {
  await getPosts({
    profileId: profileId.value,
    isInitial: true
  });
};

const onOpenMessagesModal = () => (isMessageModalOpened.value = true);
const onCloseMessagesModal = () => (isMessageModalOpened.value = false);

onMounted(async () => {
  isPageLoading.value = true;
  await getProfile(profileId.value);
  await loadPostsInitial();
  isPageLoading.value = false;
});
</script>
<style scoped>
.profileHeaderButton {
  @apply ml-auto text-sm px-5 py-2 rounded-full border border-dim-200 hover:bg-dim-400/20 dark:hover:bg-white/10 default-transition disabled:opacity-50;
}
</style>

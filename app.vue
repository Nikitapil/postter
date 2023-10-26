<template>
  <div :class="{ dark: isDarkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div
        v-if="user"
        class="min-h-full"
      >
        <div
          class="grid grid-cols-[auto_1fr_minmax(0,auto)] mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <section class="md:block w-fit">
            <div class="sticky top-0">
              <LeftSidebar
                :user="user"
                @logout="handleUserLogout"
              />
            </div>
          </section>

          <main class="">
            <NuxtPage />
          </main>

          <section class="hidden md:block min-w-[350px]">
            <div class="sticky top-0">
              <RightSidebar @toggle-theme="toggleTheme" />
            </div>
          </section>
        </div>
      </div>

      <LoadingPage v-else-if="isAuthLoading" />

      <AuthPage v-else />

      <Modal
        v-if="user"
        :is-open="isTweetModalOpen"
        @close-modal="closeTweetModal"
      >
        <!--        TODO go to tweet-->
        <TweetForm
          :user="user"
          :reply-to="replyToTweet"
          @on-success="handleTweetSuccess"
        />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from '~/components/sidebars/left/LeftSidebar.vue';
import RightSidebar from '~/components/sidebars/right/RightSidebar.vue';
import AuthPage from '~/components/Auth/AuthPage.vue';
import useAuth from '~/compasables/useAuth';
import Modal from '~/components/ui/Modal.vue';
import useEmitter from '~/compasables/useEmitter';
import { IPost } from '~/types/tweet-client-types';
import useTheme from '~/compasables/useTheme';

const { isDarkMode } = useTheme();

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

const user = useAuthUser();
const isAuthLoading = useAuthLoading();
const emitter = useEmitter();
const replyToTweet = ref<IPost | null>(null);

emitter.$on('replyTweet', (tweet) => {
  replyToTweet.value = tweet;
  openTweetModal();
});

const isTweetModalOpen = ref(false);

const openTweetModal = () => (isTweetModalOpen.value = true);
const closeTweetModal = () => (isTweetModalOpen.value = false);

const handleTweetSuccess = (tweetId: string) => {
  closeTweetModal();
  if (replyToTweet.value) {
    navigateTo(`/status/${replyToTweet.value.id}`);
    replyToTweet.value = null;
    return;
  }
  navigateTo(`/status/${tweetId}`);
};

const toggleTheme = () => (darkMode.value = !darkMode.value);

const handleUserLogout = () => {
  logout();
};

onBeforeMount(async () => {
  await initAuth();
});
</script>

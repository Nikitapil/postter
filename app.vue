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
                @logout="openLogoutModal"
              />
            </div>
          </section>

          <main>
            <NuxtPage />
          </main>

          <section class="hidden md:block min-w-[350px]">
            <div class="sticky top-0">
              <RightSidebar />
            </div>
          </section>
        </div>
      </div>

      <LoadingPage v-else-if="isAuthLoading" />

      <AuthPage v-else />

      <ConfirmModal
        title="Confirm logout?"
        :is-open="isLogoutModalOpened"
        @close-modal="closeLogoutModal"
        @confirm="handleUserLogout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from '~/components/sidebars/left/LeftSidebar.vue';
import RightSidebar from '~/components/sidebars/right/RightSidebar.vue';
import AuthPage from '~/components/Auth/AuthPage.vue';
import useAuth from '~/composables/useAuth';
import useTheme from '~/composables/useTheme';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';

const { isDarkMode, setInitialTheme } = useTheme();

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

const user = useAuthUser();
const isAuthLoading = useAuthLoading();

const isLogoutModalOpened = ref(false);

const openLogoutModal = () => (isLogoutModalOpened.value = true);
const closeLogoutModal = () => (isLogoutModalOpened.value = false);

const handleUserLogout = () => {
  logout();
  closeLogoutModal();
};

onBeforeMount(async () => {
  await initAuth();
  setInitialTheme();
});
</script>

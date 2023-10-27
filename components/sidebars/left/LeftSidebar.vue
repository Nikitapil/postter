<template>
  <div class="h-screen flex flex-col p-2">
    <div
      class="my-2 px-2 py-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/10 default-transition"
    >
      <NuxtLink
        class="max-w-fit block"
        to="/"
      >
        <div class="h-9 flex gap-0.5 w-full items-center">
          <div class="w-9">
            <PostterLogo />
          </div>
          <span class="hidden xl:block text-xl font-semibold dark:text-white">
            ostter
          </span>
        </div>
      </NuxtLink>
    </div>
    <div class="mt-2 space-y-3">
      <Tab to="/">
        <template #icon>
          <HomeIcon />
        </template>
        <template #name> Home </template>
      </Tab>

      <Tab to="/search">
        <template #icon>
          <MagnifyingGlassIcon />
        </template>
        <template #name> Search </template>
      </Tab>

      <Tab to="/trends">
        <template #icon>
          <ArrowTrendingUpIcon />
        </template>
        <template #name> Trends </template>
      </Tab>

      <Tab to="/messages">
        <template #icon>
          <InboxIcon />
        </template>
        <template #name> Messages </template>
      </Tab>

      <Tab to="/bookmarks">
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name> Bookmarks </template>
      </Tab>

      <Tab to="/profile">
        <template #icon>
          <UserIcon />
        </template>
        <template #name> Profile </template>
      </Tab>

      <div class="block xl:hidden mx-2">
        <AppFooter appearance="icons" />
      </div>

      <div class="hidden xl:block">
        <AppFooter appearance="full" />
      </div>
    </div>

    <div
      class="flex items-center p-2 mt-auto mb-5 rounded-full cursor-pointer 2-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800 default-transition"
      @click="$emit('logout')"
    >
      <div class="flex">
        <UserAvatar :link="user.profileImage" />
        <div class="hidden flex-col ml-2 xl:flex">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ user.name }}
          </h1>
          <p class="text-sm text-gray-400">@{{ user.username }}</p>
        </div>
      </div>

      <div class="hidden ml-auto xl:block">
        <div class="h-6 w-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PostterLogo from '~/components/PostterLogo/PostterLogo.vue';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/solid';
import Tab from '~/components/sidebars/left/Tab.vue';
import { IUser } from '~/types/auth-types';
import UserAvatar from '~/components/ui/UserAvatar.vue';

defineProps<{
  user: IUser;
}>();

defineEmits<{
  openTweetModal: [];
  logout: [];
}>();
</script>

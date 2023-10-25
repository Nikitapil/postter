<template>
  <div class="h-screen flex flex-col p-2">
    <div
      class="my-2 px-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/10 default-transition"
    >
      <NuxtLink
        class="max-w-fit block"
        to="/"
      >
        <div class="w-8 h-8">
          <TwitterLogo />
        </div>
      </NuxtLink>
    </div>
    <div class="mt-2 space-y-3">
      <Tab active>
        <template #icon>
          <HomeIcon />
        </template>
        <template #name> Home </template>
      </Tab>

      <Tab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template #name> Explore </template>
      </Tab>

      <Tab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name> Notifications </template>
      </Tab>

      <Tab>
        <template #icon>
          <InboxIcon />
        </template>
        <template #name> Messages </template>
      </Tab>

      <Tab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name> Bookmarks </template>
      </Tab>

      <Tab>
        <template #icon>
          <DocumentTextIcon />
        </template>
        <template #name> Lists </template>
      </Tab>

      <Tab>
        <template #icon>
          <UserIcon />
        </template>
        <template #name> Profile </template>
      </Tab>

      <Tab>
        <template #icon>
          <CircleStackIcon />
        </template>
        <template #name> More </template>
      </Tab>

      <div class="hidden xl:block">
        <AppButton
          size="lg"
          @click="$emit('openTweetModal')"
        >
          <span class="font-bold">Tweet</span>
        </AppButton>
      </div>

      <div class="block xl:hidden">
        <AppButton
          size="sm"
          @click="$emit('openTweetModal')"
        >
          <div class="w-6 h-6">
            <PencilIcon />
          </div>
        </AppButton>
      </div>
    </div>

    <div
      class="flex items-center p-2 mt-auto mb-5 rounded-full cursor-pointer 2-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800 default-transition"
      @click="$emit('logout')"
    >
      <div class="flex">
        <!--        TODO create component for user avatar-->
        <img
          class="w-10 h-10 rounded-full"
          :src="user.profileImage"
          alt="user avatar"
        />
        <div class="hidden flex-col ml-2 xl:flex">
          <h1 class="text-sm font-bold text-gray-800 :dar">
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
import TwitterLogo from '~/components/PostterLogo/PostterLogo.vue';
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  CircleStackIcon,
  PencilIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/solid';
import Tab from '~/components/sidebars/left/Tab.vue';
import AppButton from '~/components/ui/AppButton.vue';
import { IUser } from '~/types/auth-types';

defineProps<{
  user: IUser;
}>();

defineEmits<{
  openTweetModal: [];
  logout: [];
}>();
</script>

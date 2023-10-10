<template>
  <div class="h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/10 default-transition">
      <NuxtLink class="max-w-fit block" to="/">
        <div class="w-8 h-8">
          <TwitterLogo />
        </div>
      </NuxtLink>
    </div>
    <div class="mt-2 space-y-3">
      <Tab active>
        <template #icon>
          <HomeIcon/>
        </template>
        <template #name>
          Home
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <HashtagIcon/>
        </template>
        <template #name>
          Explore
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name>
          Notifications
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <InboxIcon />
        </template>
        <template #name>
          Messages
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name>
          Bookmarks
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <DocumentTextIcon />
        </template>
        <template #name>
          Lists
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <UserIcon />
        </template>
        <template #name>
          Profile
        </template>
      </Tab>

      <Tab>
        <template #icon>
          <CircleStackIcon />
        </template>
        <template #name>
          More
        </template>
      </Tab>
    </div>
  </div>
</template>
<script setup lang="ts">
import TwitterLogo from "~/components/logo/TwitterLogo.vue";
import { HomeIcon, HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, CircleStackIcon } from '@heroicons/vue/24/solid'
import Tab from "~/components/sidebars/left/Tab.vue";

</script>

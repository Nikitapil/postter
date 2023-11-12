<template>
  <MainSection :loading="false">
    <template #title>
      <div class="flex items-center gap-2">
        <UserAvatar link="https://loremflickr.com/200/200" />
        <span>Nikita Piliavets</span>
      </div>
    </template>

    <div class="px-4">
      <div class="flex gap-4 text-gray-400 mb-2">
        <p>@Nikitapil</p>
        <p class="flex items-center gap-1">
          <CalendarDaysIcon class="w-5 h-5" />
          registered at {{ registeredDateText }}
        </p>
      </div>
      <p class="dark:text-gray-200 mb-2">
        About me. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Atque ea molestias praesentium quaerat vitae! Accusantium culpa
        deleniti, dolorum illo, ipsam ipsum iusto laborum omnis recusandae sed
        similique soluta unde veniam.
      </p>
      <div class="flex gap-3">
        <NuxtLink
          class="link-gray"
          to="#"
        >
          100 followers
        </NuxtLink>
        <NuxtLink
          class="link-gray"
          to="#"
        >
          99 following
        </NuxtLink>
      </div>
    </div>
  </MainSection>
</template>

<script setup lang="ts">
import UserAvatar from '~/components/ui/UserAvatar.vue';
import { CalendarDaysIcon } from '@heroicons/vue/24/solid';
const registeredDateText = computed(() => new Date().toLocaleDateString());
</script>

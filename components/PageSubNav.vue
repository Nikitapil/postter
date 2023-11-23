<template>
  <div class="flex justify-around mb-5">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      class="dark:text-white hover:opacity-70 default-transition"
      active-class="border-b"
      :to="link.to"
    >
      {{ link.text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { INavLink } from '~/types/components';

defineProps<{
  links: INavLink[];
}>();
</script>

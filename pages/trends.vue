<template>
  <MainSection
    title="Trending"
    :loading="false"
  >
    <div class="border-b">
      <PageSubNav :links="navlinks" />
    </div>
    <NuxtPage />
  </MainSection>
</template>

<script setup lang="ts">
import { INavLink } from '~/types/components';

const navlinks = computed<INavLink[]>(() => {
  return [
    {
      to: '/trends/posts',
      text: 'Posts'
    },
    {
      to: '/trends/users',
      text: 'Users'
    }
  ];
});
</script>

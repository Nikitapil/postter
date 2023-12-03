<template>
  <div>
    <MainSection
      title="Search"
      :loading="false"
    >
      <Head>
        <Title>Search / Postter</Title>
      </Head>

      <div class="border-b">
        <PageSubNav :links="navlinks" />
      </div>

      <NuxtPage />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import { INavLink } from '~/types/components';

const navlinks = computed<INavLink[]>(() => {
  return [
    {
      to: '/search/posts',
      text: 'Posts'
    },
    {
      to: '/search/users',
      text: 'Users'
    }
  ];
});
</script>

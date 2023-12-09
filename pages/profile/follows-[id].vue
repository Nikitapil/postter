<template>
  <div>
    <MainSection :loading="false">
      <Head>
        <Title>Follows / Postter</Title>
      </Head>

      <template #title>
        <PageSubNav :links="navLinks" />
      </template>

      <NuxtPage />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import { INavLink } from '~/types/components';
import PageSubNav from '~/components/PageSubNav.vue';

const route = useRoute();

const profileId = computed(() => route.params.id);

const followersLink = computed(
  () => `/profile/follows-${profileId.value}/followers`
);
const followingLink = computed(
  () => `/profile/follows-${profileId.value}/following`
);

const navLinks = computed<INavLink[]>(() => {
  return [
    {
      to: followersLink.value,
      text: 'Followers'
    },
    {
      to: followingLink.value,
      text: 'Following'
    }
  ];
});
</script>

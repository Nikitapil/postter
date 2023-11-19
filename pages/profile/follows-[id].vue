<template>
  <div>
    <MainSection :loading="false">
      <template #title>
        <div class="flex justify-around">
          <NuxtLink
            class="dark:text-white hover:opacity-70 default-transition"
            active-class="border-b"
            :to="followersLink"
            >Followers
          </NuxtLink>
          <NuxtLink
            class="dark:text-white hover:opacity-70 default-transition"
            active-class="border-b"
            :to="followingLink"
          >
            Following
          </NuxtLink>
        </div>
      </template>

      <NuxtPage />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const profileId = computed(() => route.params.id);

const followersLink = computed(
  () => `/profile/follows-${profileId.value}/followers`
);
const followingLink = computed(
  () => `/profile/follows-${profileId.value}/following`
);
</script>

<template>
  <Head>
    <Title>Auth / Postter</Title>
  </Head>
  <div class="flex h-screen">
    <div class="relative flex-1 hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="~/assets/images/auth-page-cover.avif"
        alt="building with columns"
      />
    </div>

    <div
      class="flex flex-col h-full justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div
        class="flex items-center w-full h-full overflow-auto max-w-sm mx-auto lg:w-96"
      >
        <AuthForm />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppFooter from '~/components/AppFooter/AppFooter.vue';
</script>

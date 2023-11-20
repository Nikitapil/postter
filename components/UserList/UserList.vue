<template>
  <div
    v-if="loading"
    class="flex justify-center"
  >
    <UiSpinner />
  </div>
  <div
    v-else-if="!users.length"
    class="text-center dark:text-white text-xl font-bold"
  >
    No users
  </div>
  <div v-else>
    <UserListItem
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </div>
  <!--  Todo add observer to load more users-->
</template>

<script setup lang="ts">
import { IUser } from '~/types/auth-types';

withDefaults(
  defineProps<{
    users: IUser[];
    loading?: boolean;
  }>(),
  {
    loading: false
  }
);
</script>

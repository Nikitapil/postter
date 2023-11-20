<template>
  <div v-if="loading">
    <UiSpinner />
  </div>
  <div v-else-if="!users.length">No users</div>
  <div v-else>
    <UserListItem
      v-for="user in users"
      :key="user.id"
    />
  </div>
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

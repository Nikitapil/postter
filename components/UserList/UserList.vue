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
  <ul v-else>
    <li
      v-for="user in users"
      :key="user.id"
    >
      <UserListItem
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
    </li>
    <li>
      <ScrollObserver @intersect="$emit('feedEnd')" />
    </li>
  </ul>
  <!--  Todo add observer to load more users-->
</template>

<script setup lang="ts">
import { IUser } from '~/types/auth-types';
import ScrollObserver from '~/components/ui/ScrollObserver.vue';

withDefaults(
  defineProps<{
    users: IUser[];
    loading?: boolean;
  }>(),
  {
    loading: false
  }
);

defineEmits<{
  feedEnd: [];
}>();
</script>

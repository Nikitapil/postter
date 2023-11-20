<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute();
const { usersList, getUserFollowList } = useUsersList();

const id = computed(() => route.params.id);
</script>

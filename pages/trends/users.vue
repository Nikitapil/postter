<template>
  <UserList
    :loading="isUsersLoading"
    :users="usersList"
  />
</template>

<script setup lang="ts">
const { usersList, getUsersList } = useUsersList();

const isUsersLoading = ref(false);

onMounted(async () => {
  isUsersLoading.value = true;
  await getUsersList({
    isInitial: true
  });
  isUsersLoading.value = false;
});
</script>

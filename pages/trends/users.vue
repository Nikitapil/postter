<template>
  <UserList
    :loading="isUsersLoading"
    :users="usersList"
  />
</template>

<script setup lang="ts">
const { usersList, getTopUserList } = useUsersList();

const isUsersLoading = ref(false);

onMounted(async () => {
  isUsersLoading.value = true;
  await getTopUserList({
    isInitial: true
  });
  isUsersLoading.value = false;
});
</script>

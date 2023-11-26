<template>
  <div>
    <MainSection title="Messages">
      <ChatList :chat-list="chats" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ChatList from '~/components/ChatList/ChatList.vue';
import useUsersChats from '~/composables/useUsersChats';

const { getUsersChats, chats } = useUsersChats();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await getUsersChats();
  isLoading.value = false;
});
</script>

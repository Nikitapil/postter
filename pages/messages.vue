<template>
  <div>
    <MainSection
      title="Messages"
      :loading="isLoading"
    >
      <Head>
        <Title>Messages / Postter</Title>
      </Head>

      <ChatList :chat-list="chats" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import ChatList from '~/components/Chat/ChatList/ChatList.vue';
import useUsersChats from '~/composables/useUsersChats';

const { getUsersChats, chats } = useUsersChats();

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await getUsersChats();
  isLoading.value = false;
});
</script>

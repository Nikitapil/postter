<template>
  <MainSection
    v-if="user"
    :loading="isLoading"
    :title="title"
  >
    <MessagesList
      v-if="chat"
      :messages="chat.messages"
      :user-id="user.id"
    />
  </MainSection>
</template>

<script setup lang="ts">
import MessagesList from '~/components/Chat/MessagesList/MessagesList.vue';

const route = useRoute();

const { chat, getChat } = useSingleChat();
const { useAuthUser } = useAuth();
const user = useAuthUser();

const isLoading = ref(false);

const chatId = computed(() => route.params.id as string);

const title = computed(() => {
  if (isLoading.value) {
    return 'Loading...';
  }
  if (!chat.value) {
    return 'Chat not found';
  }
  return `Chat with ${chat.value?.companionUser.name || ''} @${
    chat.value?.companionUser.username || ''
  }`;
});

onMounted(async () => {
  isLoading.value = true;
  await getChat({ chatId: chatId.value });
  isLoading.value = false;
});
</script>

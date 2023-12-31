<template>
  <MainSection
    v-if="user"
    :loading="isLoading"
    :title="title"
  >
    <Head>
      <Title>Chat / Postter</Title>
    </Head>
    <div v-if="chat">
      <MessagesList
        :messages="chat.messages"
        :user-id="user.id"
        @end-of-chat="openMessages"
      />
      <MessageForm
        :is-loading="isCreateMessageInProgress"
        @create-message="onCreateMessage"
      />
    </div>
    <div
      v-else
      class="text-center text-2xl dark:text-white"
    >
      Chat not found
    </div>
  </MainSection>
</template>

<script setup lang="ts">
import MessagesList from '~/components/Chat/MessagesList/MessagesList.vue';
import MessageForm from '~/components/Chat/MessageForm.vue';
import { IChatMessage } from '~/types/messages-client-types';

const route = useRoute();

const { chat, getChat, createMessage, addMessage, openMessages } =
  useSingleChat();
const { connect, joinRoom, subscribe } = useSocket();
const { useAuthUser } = useAuth();
const user = useAuthUser();

const isLoading = ref(false);
const isCreateMessageInProgress = ref(false);

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

const onCreateMessage = async (text: string) => {
  isCreateMessageInProgress.value = true;
  await createMessage(text);
  isCreateMessageInProgress.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  await getChat({ chatId: chatId.value });
  if (chat.value) {
    connect();
    joinRoom(`chat_${chat.value.id}`);
    subscribe('message', (message: IChatMessage) => {
      addMessage(message);
    });
  }
  isLoading.value = false;
});
</script>

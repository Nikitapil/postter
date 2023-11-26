import {
  IChat,
  IGetChatResponse,
  IGetSingleChatParams
} from '~/types/messages-client-types';

export default () => {
  const { createMessage: createMessageInitial } = useMessages();

  const chat = ref<IChat | null>(null);

  const getChat = async ({ chatId }: IGetSingleChatParams) => {
    try {
      const { chat: chatFromApi } = await useFetchApi<IGetChatResponse>(
        `/api/messages/chat/${chatId}`
      );
      chat.value = chatFromApi;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error on create message');
    }
  };

  const createMessage = async (text: string) => {
    if (!chat.value) {
      return;
    }

    const messageResponse = await createMessageInitial({
      userToId: chat.value.companionUser.id,
      text
    });

    if (messageResponse?.message) {
      chat.value.messages.push(messageResponse.message);
    }
  };

  return { getChat, createMessage, chat };
};

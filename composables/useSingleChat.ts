import {
  IChat,
  IChatMessage,
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
      chat.value = null;
    }
  };

  const createMessage = async (text: string) => {
    if (!chat.value) {
      return;
    }

    await createMessageInitial({
      userToId: chat.value.companionUser.id,
      text
    });
  };

  const addMessage = (message: IChatMessage) => {
    if (chat.value) {
      chat.value.messages.push(message);
    }
  };

  return { getChat, createMessage, addMessage, chat };
};

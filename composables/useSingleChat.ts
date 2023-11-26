import {
  IChat,
  IGetChatResponse,
  IGetSingleChatParams
} from '~/types/messages-client-types';

export default () => {
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

  return { getChat, chat };
};

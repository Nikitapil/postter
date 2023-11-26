import { IChat, IGetUsersChatsResponse } from '~/types/messages-client-types';

export default () => {
  const chats = ref<IChat[]>([]);

  const getUsersChats = async () => {
    try {
      const { chats: chatsFromApi } = await useFetchApi<IGetUsersChatsResponse>(
        '/api/messages/chat/all',
        {
          method: 'GET'
        }
      );

      chats.value = chatsFromApi;
    } catch (e) {
      chats.value = [];
    }
  };

  return { getUsersChats, chats };
};

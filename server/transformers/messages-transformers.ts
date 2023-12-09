import { IChatFromDb } from '~/server/types/messages-types';
import { userTransformer } from '~/server/transformers/user-transformers';

export const chatTransformer = (chat: IChatFromDb, currentUserId: string) => {
  const companionUser = chat.users.find((user) => user.id !== currentUserId);
  return {
    ...chat,
    users: chat.users.map((user) => userTransformer(user, currentUserId)),
    companionUser,
    unreadMessageCount: chat._count.messages,
    messages: chat.messages.map((message) => {
      return {
        ...message,
        author: message.author
          ? userTransformer(message.author, currentUserId)
          : null
      };
    })
  };
};

import { IChatFromDb } from '~/server/types/messages-types';
import { userTransformer } from '~/server/transformers/user-transformers';

export const chatTransformer = (chat: IChatFromDb) => {
  return {
    ...chat,
    users: chat.users.map((user) => userTransformer(user)),
    messages: chat.messages.map((message) => {
      return {
        ...message,
        author: message.author ? userTransformer(message.author) : null
      };
    })
  };
};

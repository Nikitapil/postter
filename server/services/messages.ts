import {
  ICreateChatParams,
  ICreateMessageParams,
  IGetChatParams
} from '~/server/types/messages-types';
import { z } from 'zod';
import { prisma } from '~/server/services/index';
import { ApiError } from '~/server/utils/ApiError';

const createChatParamsSchema = z.object({
  usersIds: z.array(z.string().min(1)).min(2)
});

const createMessageSchema = z.object({
  text: z.string().min(1),
  authorId: z.string().min(1),
  userToId: z.string().min(1)
});

const getChatSchema = z.object({
  userId: z.string().min(1),
  chatId: z.string().min(1)
});

export const createChat = async (params: ICreateChatParams) => {
  const { usersIds } = createChatParamsSchema.parse(params);

  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: usersIds.map((id) => ({ id }))
      }
    }
  });

  return chat;
};

export const createMessage = async (params: ICreateMessageParams) => {
  const { authorId, userToId, text } = createMessageSchema.parse(params);

  const usersIds = [authorId, userToId];

  let chat = await prisma.chat.findFirst({
    where: {
      usersIds: {
        hasEvery: usersIds
      }
    }
  });

  if (!chat) {
    chat = await createChat({ usersIds });
  }

  const message = await prisma.message.create({
    data: {
      authorId,
      text,
      chatId: chat.id
    }
  });

  return { message };
};

export const getChat = async (params: IGetChatParams) => {
  const { userId, chatId } = getChatSchema.parse(params);

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      users: {
        select: getSafeUserSelectWithFollowedBy(userId)
      },
      messages: {
        include: {
          author: {
            select: getSafeUserSelectWithFollowedBy(userId)
          }
        }
      }
    }
  });

  if (!chat) {
    throw ApiError.NotFoundError('Chat not found');
  }

  return { chat };
};

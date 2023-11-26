import { ISafeUserFromDb } from '~/server/types/users-types';

export interface ICreateChatParams {
  usersIds: string[];
}

export interface ICreateMessageParams {
  authorId: string;
  userToId: string;
  text: string;
}

export interface IGetChatParams {
  userId: string;
  chatId: string;
}

export interface IGetAllUserChatsParams {
  userId: string;
}

export interface IMessageFromDb {
  id: string;
  text: string;
  authorId: string;
  chatId: string;
  isOpened: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  author?: ISafeUserFromDb;
}

export interface IChatFromDb {
  id: string;
  usersIds: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  users: ISafeUserFromDb[];
  messages: IMessageFromDb[];
  _count: {
    messages: number;
  };
}

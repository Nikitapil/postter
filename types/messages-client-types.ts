import { IUser } from '~/types/auth-types';

export interface ICreateMessageParams {
  userToId: string;
  text: string;
}

export interface IBaseMessage {
  id: string;
  text: string;
  authorId: string;
  chatId: string;
  isOpened: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatMessage extends IBaseMessage{
  author: IUser;
}

export interface IChat {
  users: IUser[];
  companionUser: IUser;
  messages: IChatMessage[];
  id: string;
  usersIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateMessageResponse {
  message: IBaseMessage;
}

export interface IGetUsersChatsResponse {
  chats: IChat[];
}

export interface IGetSingleChatParams {
  chatId: string;
}

export interface IGetChatResponse {
  chat: IChat;
}
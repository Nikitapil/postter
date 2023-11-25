export interface ICreateChatParams {
  usersIds: string[];
}

export interface ICreateMessageParams {
  authorId: string;
  userToId: string;
  text: string;
}

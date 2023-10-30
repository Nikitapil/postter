export interface IPostDto {
  authorId: string;
  text: string;
  replyToId?: string;
}

export interface ITweetFromDb {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  replyToId: string | null;
}

import { IUserDataFiltered } from '~/server/types/users-types';
import { IMediaFileFromDb } from '~/server/types/media-files-types';

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

export interface IPostFromDbBase {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  replyToId: string | null;
}

export interface IPostFromDb extends IPostFromDbBase {
  _count: { replies: number };
  mediaFiles: IMediaFileFromDb[];
  replyTo: IPostFromDbBase | null;
  author: IUserDataFiltered;
  replies?: IPostFromDbBase[];
}

export interface ITransformedPost extends IPostFromDb {
  repliesCount: number;
  postedAt: string;
  replies: ITransformedPost[];
}

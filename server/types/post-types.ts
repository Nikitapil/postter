import { IUserDataFiltered } from '~/server/types/users-types';
import { IMediaFileFromDb } from '~/server/types/media-files-types';

export interface IPostDto {
  authorId: string;
  text: string;
  replyToId?: string;
  mediaFilesUrls?: string[];
}

export interface IGetPostsRequest {
  search: string;
  page?: number | null;
  limit?: number | null;
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

export interface IGetPostById {
  id: string;
  repliesPage?: number;
  repliesLimit?: number;
}

export interface IToggleLike {
  postId: string;
  userId: string;
}

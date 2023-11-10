import { IUserDataFiltered } from '~/server/types/users-types';
import { IMediaFileFromDb } from '~/server/types/media-files-types';
import {b} from "vite-node/types-516036fa";

export interface IPostDto {
  authorId: string;
  text: string;
  replyToId?: string;
  mediaFilesUrls?: string[];
}

export interface IGetPostsRequest {
  search: string;
  userId: string;
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

export interface ILikeFromDb {
  id: string;
  postId: string;
  userId: string;
}

export interface IPostFromDb extends IPostFromDbBase {
  _count: { replies: number; likes: number };
  mediaFiles: IMediaFileFromDb[];
  replyTo: IPostFromDbBase | null;
  author: IUserDataFiltered;
  replies?: IPostFromDbBase[];
  likes: ILikeFromDb[];
}

export interface ITransformedPost extends IPostFromDb {
  repliesCount: number;
  likesCount: number;
  postedAt: string;
  replies: ITransformedPost[];
  isLiked: boolean;
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

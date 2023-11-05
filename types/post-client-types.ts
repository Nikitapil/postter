import { IUser } from '~/types/auth-types';
import { IMediaFile } from '~/types/media-files';

export interface IPostFormData {
  text: string;
  mediaFiles: File[];
  replyToId?: string;
}

export interface IGetPostsParams {
  query?: string;
}

export interface IPost {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  replyToId: string | null;
  author: IUser;
  mediaFiles?: IMediaFile[];
  postedAt: string;
  replyTo?: IPost | null;
  repliesCount?: number;
  replies: IPost[];
}

export interface IPostsResponse {
  posts: IPost[];
}

export interface ISinglePostResponse {
  post: IPost;
}
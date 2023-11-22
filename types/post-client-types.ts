import { IUser } from '~/types/auth-types';
import { IMediaFile } from '~/types/media-files';

export interface IPostFormData {
  text: string;
  mediaFiles: File[];
  replyToId?: string;
}

export interface IGetPostsParams {
  query?: string;
  page?: number;
  limit?: number;
  profileId?: string;
  likedByUserId?: string;
}

export interface IGetPostsParamsExtended extends IGetPostsParams {
  isMyPostFeed?: boolean;
  isInitial?: boolean;
}

export interface IGetPostByIdParams {
  id: string;
  page?: number;
  limit?: number;
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
  repostFrom?: IPost | null;
  repliesCount?: number;
  replies: IPost[];
  likesCount: number;
  isLiked: boolean;
  repostsCount: number;
}

export interface IPostsResponse {
  posts: IPost[];
  totalCount: number;
}

export interface ISinglePostResponse {
  post: IPost;
}

export interface IRepliesResponse {
  replies: IPost[];
}

export interface ILikesResponse {
  isLiked: boolean;
}

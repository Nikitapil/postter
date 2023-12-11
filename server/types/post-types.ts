import { IUserDataFiltered } from '~/server/types/users-types';
import { IMediaFileFromDb } from '~/server/types/media-files-types';
import { IPaginationQueryParams } from '~/server/types/common';

export interface ICreatePostParams {
  authorId: string;
  text: string;
  replyToId?: string;
  mediaFilesUrls?: string[];
  repostFromId?: string;
}

export interface IEditPostParams {
  postId: string;
  userId: string;
  text: string;
  mediaFilesUrls?: string[];
}

export interface IGetPostsBaseRequest {
  page?: number | null;
  limit?: number | null;
  userId: string | null;
}

export interface IGetPostsRequest extends IGetPostsBaseRequest {
  search: string;
  profileId?: string | null;
  likedByUserId?: string;
}

export interface IGetMyFeedParams extends IGetPostsBaseRequest {}

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
  _count: { replies: number; likes: number; reposts: number };
  mediaFiles: IMediaFileFromDb[];
  replyTo: IPostFromDbBase | null;
  author: IUserDataFiltered;
  replies?: IPostFromDbBase[];
  likes: ILikeFromDb[];
  text: string;
  repostFrom: IPostFromDbBase | null;
}

export interface ITransformedPost extends IPostFromDb {
  repliesCount: number;
  likesCount: number;
  repostsCount: number;
  postedAt: string;
  replies: ITransformedPost[];
  isLiked: boolean;
  canDelete: boolean;
  canEdit: boolean;
}

export interface IGetPostById {
  id: string;
  userId: string;
  repliesPage?: number;
  repliesLimit?: number;
}

export interface IToggleLike {
  postId: string;
  userId: string;
}

export interface IRepostParams {
  repostFromId: string;
  authorId: string;
}

export interface IDeletePostParams {
  postId: string;
  userId: string;
}

export interface IGePostsQueryParams extends IPaginationQueryParams {
  query: string;
  profileId?: string;
  likedByUserId?: string;
}

export interface IGetRepliesQueryParams extends IPaginationQueryParams {
  id: string;
}

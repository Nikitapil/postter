import {IUser} from "~/types/auth-types";
import {IMediaFile} from "~/types/media-files";

export interface ITweetFormData {
    text: string,
    mediaFiles: File[]
    replyToId?: string
}

export interface IGetTweetsParams {
    query?: string
}

export interface ITweet {
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    replyToId: string | null;
    author: IUser;
    mediaFiles?: IMediaFile[]
    postedAt: string
    replyTo?: ITweet | null
    repliesCount?: number
    replies: ITweet[]
}

export interface ITweetResponse {
    tweets: ITweet[]
}

export interface ISingleTweetResponse {
    tweet: ITweet
}
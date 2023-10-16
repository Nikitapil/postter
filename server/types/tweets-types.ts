import {IUserFormDb} from "~/server/types/users-types";

export interface ITweetDto {
    authorId: string;
    text: string;
    replyToId?: string;
}

export interface ITweetFromDb {
    id: string,
    text: string,
    createdAt: Date,
    updatedAt: Date,
    authorId: string,
    replyToId: string | null
}
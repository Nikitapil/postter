export interface ITweetDto {
    authorId: string;
    text: string;
}

export interface ITweetFromDb {
    id: string,
    text: string,
    createdAt: Date,
    updatedAt: Date,
    authorId: string,
    replyToId: string | null
}
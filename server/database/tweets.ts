import {ITweetDto} from "~/server/types/tweets-types";
import {prisma} from "~/server/database/index";

export const createTweet = (tweetData: ITweetDto) => {
    return prisma.tweet.create({
        data: tweetData
    })
}
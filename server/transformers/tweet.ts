import {ITweetFromDb} from "~/server/types/tweets-types";

export const tweetTransformer = (tweet: ITweetFromDb) => {
    return {
        id: tweet.id,
        text: tweet.text
    }
}
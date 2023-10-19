import {getTweets} from "~/server/database/tweets";
import human from 'human-time'
export default defineEventHandler(async (event) => {

    const tweets = await getTweets()

    return {
        // Todo get repliesCount from DB and transfer this to service method or mapper
        // TODO convert postedAt at service method
        tweets: tweets.map(tweet =>
            ({ ...tweet,
                repliesCount: tweet.replies.length,
                postedAt: human(tweet.createdAt),
                replies: tweet.replies.map(reply => ({ ...reply, postedAt: human(reply.createdAt)}))
            }))
    }
})
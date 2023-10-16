import {getTweets} from "~/server/database/tweets";

export default defineEventHandler(async (event) => {

    const tweets = await getTweets()

    return {
        // Todo get repliesCount from DB
        tweets: tweets.map(tweet => ({ ...tweet, repliesCount: tweet.replies.length }))
    }
})
import {ISingleTweetResponse, ITweet, ITweetFormData, ITweetResponse} from "~/types/tweet-client-types";
import useFetchApi from "~/compasables/useFetchApi";
import {awaitExpression} from "@babel/types";

export default () => {
    const postTweet = (data: ITweetFormData) => {
        // TODO add try catch and handle errors
        const form = new FormData()

        form.append('text', data.text)

        data.mediaFiles.forEach(file => {
            form.append(`media_file_${file.name}`, file)
        })

        if (data.replyToId) {
            form.append('replyToId', data.replyToId)
        }

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }

    const getTweets = async (): Promise<ITweet[]> => {
        try {
            const { tweets } = await useFetchApi<ITweetResponse>('/api/user/tweets', {
                method: 'GET'
            })
            return tweets
        } catch (e) {
            // TODO handle this error
            throw e
        }
    }

    const getTweetById = async (tweetId: string): Promise<ITweet | null> => {
        try {
            const { tweet } = await useFetchApi<ISingleTweetResponse>(`/api/user/tweets/${tweetId}`, {
                method: 'GET'
            })
            return tweet
        } catch (e) {
            return null
        }
    }

    return { postTweet, getTweets, getTweetById }
}
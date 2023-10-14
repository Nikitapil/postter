import formidable from "formidable";
import {createTweet} from "~/server/database/tweets";
import {tweetTransformer} from "~/server/transformers/tweet";
import {createMediaFile} from "~/server/database/mediaFiles";

export default defineEventHandler(async (event) => {

    const form = formidable({})


    try {
        const [fields, files] = await form.parse(event.node.req)

        const userId = event.context?.auth?.user?.id as string

        const tweetData = {
            authorId: userId,
            text: fields.text?.toString() || ''
        }

        const tweet =  await createTweet(tweetData)

        const filePromises = Object.keys(files).map(async key => {
            return createMediaFile({
                url: '',
                providerPublicId: 'random_id',
                userId: userId,
                tweetId: tweet.id
            })
        })

        await Promise.all(filePromises)

        return {
            // tweet: tweetTransformer(tweet)
            files
        }
    } catch (e) {
        //TODO handle this error
        throw e
    }
})
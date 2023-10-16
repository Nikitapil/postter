import formidable from "formidable";
import {createTweet} from "~/server/database/tweets";
import {tweetTransformer} from "~/server/transformers/tweet";
import {createMediaFile} from "~/server/database/mediaFiles";
import {ITweetDto} from "~/server/types/tweets-types";

export default defineEventHandler(async (event) => {

    const form = formidable({})



    try {
        const [fields, files] = await form.parse(event.node.req)

        const userId = event.context?.auth?.user?.id as string

        const tweetData: ITweetDto = {
            authorId: userId,
            text: fields.text?.toString() || ''
        }

        //TODO pass this field from frontend
        const replyToId = fields.replyToId?.toString() || ''

        if (replyToId) {
            tweetData.replyToId = replyToId
        }

        const tweet =  await createTweet(tweetData)

        const filePromises = Object.keys(files).map(async key => {
            return createMediaFile({
                // TODO handle all the files from an array
                url: files[key]?.[0]?.filepath || '',
                providerPublicId: 'random_id',
                userId: userId,
                tweetId: tweet.id
            })
        })

        const filesFromDb = await Promise.all(filePromises)

        return {
            tweet: {...tweetTransformer(tweet), mediaFiles: filesFromDb}
        }
    } catch (e) {
        //TODO handle this error
        throw e
    }
})
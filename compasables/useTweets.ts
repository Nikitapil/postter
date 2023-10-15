import {ITweetFormData} from "~/types/tweet-client-types";
import useFetchApi from "~/compasables/useFetchApi";

export default () => {
    const postTweet = (data: ITweetFormData) => {
        const form = new FormData()

        form.append('text', data.text)

        data.mediaFiles.forEach(file => {
            form.append(`media_file_${file.name}`, file)
        })

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }

    return { postTweet }
}
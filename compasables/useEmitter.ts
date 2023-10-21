import mitt from "mitt";
import {ITweet} from "~/types/tweet-client-types";

const emitter = mitt<{
    replyTweet: ITweet
}>()

export default () => {
    return {
        $on: emitter.on,
        $emit: emitter.emit
    }
}
import mitt from 'mitt';
import { IPost } from '~/types/tweet-client-types';

const emitter = mitt<{
  replyTweet: IPost;
}>();

export default () => {
  return {
    $on: emitter.on,
    $emit: emitter.emit
  };
};

<template>
   <div class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300 default-transition cursor-pointer">

     <TweetHeader :tweet="tweet" @click.stop />

     <div :class="tweetBodyWrapper">
       <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white">
         {{ tweet.text }}
       </p>
       <div v-if="tweet.mediaFiles">
         <div
             v-for="image in tweet.mediaFiles" :key="image.id"
             class="flex my-3 mr-2 border-2 rounded-2xl max-h-72 justify-center bg-gray-400"
         >
           <img class="rounded-2xl object-cover" :src="image.url">
         </div>
       </div>

       <div class="mt-2">
         <TweetActions :tweet="tweet" @comment-click="handleCommentClick" />
       </div>
     </div>

   </div>
</template>
<script setup lang="ts">
import {ITweet} from "~/types/tweet-client-types";
import TweetActions from "~/components/tweet/TweetActions/TweetActions.vue";
import useEmitter from "~/compasables/useEmitter";

const props = withDefaults(defineProps<{
  tweet: ITweet,
  compact?: boolean
}>(), {
  compact: false
})

const emitter = useEmitter()

const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4')

const handleCommentClick = () => {
  emitter.$emit('replyTweet', props.tweet)
}
</script>
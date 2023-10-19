<template>
  <div>
    <div class="flex items-center justify-center py-6" v-if="loading" >
      <UiSpinner />
    </div>
    <div v-else>
      <TweetFormInput :user="user" :placeholder="placeholder" @on-submit="handleFormSubmit"/>
    </div>
  </div>
</template>
<script setup lang="ts">

import {IUser} from "~/types/auth-types";
import {ITweet, ITweetFormData} from "~/types/tweet-client-types";
import useTweets from "~/compasables/useTweets";

const props = withDefaults(defineProps<{
  user: IUser,
  placeholder: string;
  // TODO get only replyToId
  replyTo?: ITweet | null
}>(), {
  replyTo: null
})

const { postTweet } = useTweets()

const loading = ref(false)

const handleFormSubmit = async (data: ITweetFormData) => {
  try {
    loading.value = true
    if (props.replyTo) {
      data.replyToId = props.replyTo.id
    }
    await postTweet(data)
  } catch (e) {
    //TODO handle this error
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>
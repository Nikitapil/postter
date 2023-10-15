<template>
  <div>
    <TweetFormInput :user="user" @on-submit="handleFormSubmit" />
  </div>
</template>
<script setup lang="ts">

import {IUser} from "~/types/auth-types";
import {ITweetFormData} from "~/types/tweet-client-types";
import useTweets from "~/compasables/useTweets";

defineProps<{
  user: IUser
}>()

const { postTweet } = useTweets()

const handleFormSubmit = async (data: ITweetFormData) => {
  try {
    const response = await postTweet(data)
    console.log(response)
  } catch (e) {
    //TODO handle this error
    console.log(e)
  }
}

</script>
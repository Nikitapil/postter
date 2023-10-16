<template>
  <div>
    <div class="flex items-center justify-center py-6" v-if="loading" >
      <UiSpinner />
    </div>
    <div v-else>
      <TweetFormInput :user="user" @on-submit="handleFormSubmit"/>
    </div>
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

const loading = ref(false)

const handleFormSubmit = async (data: ITweetFormData) => {
  try {
    loading.value = true
    const response = await postTweet(data)
  } catch (e) {
    //TODO handle this error
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>
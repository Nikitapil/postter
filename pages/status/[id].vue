<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>

      <TweetDetails v-if="tweet" :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>
<script setup lang="ts">

import useTweets from "~/compasables/useTweets";
import {ITweet} from "~/types/tweet-client-types";
import useAuth from "~/compasables/useAuth";

const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()

const user = useAuthUser()


const loading = ref(false)
const tweet = ref<ITweet | null>(null)

const getTweet = async () => {
  loading.value = true;
  const route = useRoute()
  tweet.value = await getTweetById(route.params.id as string)
  loading.value = false;
}

onMounted(() => {
  getTweet()
})
</script>
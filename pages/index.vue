<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div class="border-b">
        <TweetForm :user="user"/>
      </div>

      <ListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import useAuth from "~/compasables/useAuth";
import ListFeed from "~/components/tweet/ListFeed.vue";
import useTweets from "~/compasables/useTweets";
import {ITweet} from "~/types/tweet-client-types";

const { useAuthUser } = useAuth()
const { getTweets } = useTweets()
const user = useAuthUser()
const loading = ref(false)

const homeTweets = ref<ITweet[]>([])
// TODO get limited tweets and load by scroll(implement infinite scroll)
onBeforeMount(async () => {
  loading.value = true
  homeTweets.value = await getTweets()
  loading.value = false
})

</script>
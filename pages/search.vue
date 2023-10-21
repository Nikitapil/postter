<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search / Twitter</Title>
      </Head>

      <ListFeed :tweets="searchTweets" />
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


const searchTweets = ref<ITweet[]>([])

const getSearchTweets = async () => {
  const route = useRoute()
  const searchQuery = route.query.q
  loading.value = true
  searchTweets.value = await getTweets({
    query: searchQuery as string
  })
  loading.value = false
}

// TODO get limited tweets and load by scroll(implement infinite scroll)
// TODO update tweets on search update
onBeforeMount(async () => {
  await getSearchTweets()
})

watch(() => useRoute().fullPath, () => getSearchTweets())

</script>
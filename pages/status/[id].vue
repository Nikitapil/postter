<template>
  <div>
    <MainSection
      title="Tweet"
      :loading="loading"
    >
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>

      <TweetDetails
        v-if="tweet && user"
        :tweet="tweet"
        :user="user"
      />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import useTweets from '~/compasables/usePosts';
import { IPost } from '~/types/tweet-client-types';
import useAuth from '~/compasables/useAuth';
import TweetDetails from '~/components/posts/TweetDetails.vue';

const { getPostById } = useTweets();
const { useAuthUser } = useAuth();

const user = useAuthUser();

const loading = ref(false);
const tweet = ref<IPost | null>(null);

const getTweet = async () => {
  loading.value = true;
  const route = useRoute();
  tweet.value = await getPostById(route.params.id as string);
  loading.value = false;
};

onMounted(() => {
  getTweet();
});
</script>

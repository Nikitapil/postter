<template>
  <div>
    <MainSection
      title="Tweet"
      :loading="loading"
    >
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>

      <PostDetails
        v-if="tweet && user"
        :post="tweet"
        :user="user"
        @on-reply="updatePostReplies"
      />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import useTweets from '~/compasables/usePosts';
import { IPost } from '~/types/tweet-client-types';
import useAuth from '~/compasables/useAuth';
import PostDetails from '~/components/posts/PostDetails.vue';

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

const updatePostReplies = () => {
  // TODO update post replies here
};

onMounted(() => {
  getTweet();
});
</script>

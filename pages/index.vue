<template>
  <div>
    <MainSection
      title="Home"
      :loading="loading"
    >
      <Head>
        <Title>Home / Twitter</Title>
      </Head>

      <div
        v-if="user"
        class="border-b"
      >
        <PostForm
          :user="user"
          placeholder="What's happening?"
        />
      </div>

      <ListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import useAuth from '~/compasables/useAuth';
import ListFeed from '~/components/posts/ListFeed.vue';
import useTweets from '~/compasables/usePosts';
import { IPost } from '~/types/tweet-client-types';
import PostForm from '~/components/posts/form/PostForm.vue';

const { useAuthUser } = useAuth();
const { getPosts } = useTweets();
const user = useAuthUser();
const loading = ref(false);

const homeTweets = ref<IPost[]>([]);
// TODO get limited tweets and load by scroll(implement infinite scroll)
onBeforeMount(async () => {
  loading.value = true;
  homeTweets.value = await getPosts();
  loading.value = false;
});
</script>

<template>
  <div>
    <MainSection
      title="Home"
      :loading="loading"
    >
      <Head>
        <Title>Home / Postter</Title>
      </Head>

      <div
        v-if="user"
        class="border-b"
      >
        <PostForm
          :user="user"
          placeholder="What's happening?"
          @on-success="getPostsFeed"
        />
      </div>

      <ListFeed :posts="homePosts" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import useAuth from '~/compasables/useAuth';
import ListFeed from '~/components/posts/ListFeed.vue';
import { IPost } from '~/types/tweet-client-types';
import PostForm from '~/components/posts/form/PostForm.vue';
import usePosts from '~/compasables/usePosts';

const { useAuthUser } = useAuth();
const { getPosts } = usePosts();
const user = useAuthUser();
const loading = ref(false);

const homePosts = ref<IPost[]>([]);

const getPostsFeed = async () => {
  loading.value = true;
  homePosts.value = await getPosts();
  loading.value = false;
};

onBeforeMount(() => {
  getPostsFeed();
});
</script>

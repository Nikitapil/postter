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
          @on-success="getPostsFeedInitial"
        />
      </div>

      <ListFeed
        :posts="posts"
        @feed-end="loadMorePosts"
      />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import useAuth from '~/composables/useAuth';
import ListFeed from '~/components/posts/ListFeed.vue';
import PostForm from '~/components/posts/form/PostForm.vue';
import usePostsFeed from '~/composables/usePostsFeed';

const { useAuthUser } = useAuth();
const { getPosts, posts } = usePostsFeed();
const user = useAuthUser();
const loading = ref(false);

const getPostsFeedInitial = async () => {
  loading.value = true;
  await getPosts({
    isInitial: true
  });
  loading.value = false;
};

const loadMorePosts = async () => {
  await getPosts({
    isInitial: false
  });
};

onBeforeMount(() => {
  getPostsFeedInitial();
});
</script>

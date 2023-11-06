<template>
  <div>
    <MainSection
      title="Post"
      :loading="loading"
    >
      <Head>
        <Title>Post / Postter</Title>
      </Head>

      <PostDetails
        v-if="post && user"
        :post="post"
        :user="user"
        @on-reply="loadPost"
        @replies-end="loadMoreReplies"
      />
      <div
        v-else
        class="text-center text-2xl dark:text-white"
      >
        Post not found
      </div>
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import useAuth from '~/compasables/useAuth';
import PostDetails from '~/components/posts/PostDetails.vue';
import useSinglePost from '~/compasables/useSinglePost';

const { post, getPost, loadMoreReplies } = useSinglePost();
const { useAuthUser } = useAuth();

const user = useAuthUser();

const loading = ref(false);

const loadPost = async () => {
  loading.value = true;
  const route = useRoute();
  await getPost(route.params.id as string);
  loading.value = false;
};

onMounted(() => {
  loadPost();
});
</script>

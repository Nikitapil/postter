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
        @on-reply="getPost"
      />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types';
import useAuth from '~/compasables/useAuth';
import PostDetails from '~/components/posts/PostDetails.vue';
import usePosts from '~/compasables/usePosts';

const { getPostById } = usePosts();
const { useAuthUser } = useAuth();

const user = useAuthUser();

const loading = ref(false);
const post = ref<IPost | null>(null);

const getPost = async () => {
  loading.value = true;
  const route = useRoute();
  post.value = await getPostById(route.params.id as string);
  loading.value = false;
};

onMounted(() => {
  getPost();
});
</script>

<template>
  <div>
    <MainSection
      title="Post"
      :loading="loading"
    >
      <template #title>
        <div class="flex justify-between">
          <span>Post</span>
          <button
            v-if="canDelete"
            class="dark:hover:bg-white/20 hover:bg-black/20 default-transition p-1 rounded-md"
            @click="onDeletePost"
          >
            <TrashIcon class="w-6 h-6" />
          </button>
        </div>
      </template>
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
import useAuth from '~/composables/useAuth';
import PostDetails from '~/components/posts/PostDetails.vue';
import useSinglePost from '~/composables/useSinglePost';
import { TrashIcon } from '@heroicons/vue/24/solid';

const { post, getPost, loadMoreReplies, deletePost } = useSinglePost();
const { useAuthUser } = useAuth();

const user = useAuthUser();

const loading = ref(false);

const canDelete = computed(() => post.value?.canDelete || false);

const loadPost = async () => {
  loading.value = true;
  const route = useRoute();
  await getPost(route.params.id as string);
  loading.value = false;
};

const onDeletePost = async () => {
  loading.value = true;
  const isDeleted = await deletePost();
  if (isDeleted) {
    navigateTo('/');
  }
  loading.value = false;
};

onMounted(() => {
  loadPost();
});
</script>

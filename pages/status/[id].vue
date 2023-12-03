<template>
  <div>
    <MainSection
      title="Post"
      :loading="loading"
    >
      <template #title>
        <div class="flex justify-between">
          <span>Post</span>
          <div>
            <button
              v-if="canEdit"
              class="action-button mr-2"
              @click="onOpenEditForm"
            >
              <PencilIcon class="w-6 h-6" />
            </button>
            <button
              v-if="canDelete"
              class="action-button"
              @click="onDeletePost"
            >
              <TrashIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </template>
      <Head>
        <Title>Post / Postter</Title>
      </Head>

      <div v-if="post && user">
        <PostsFormPostFormInput
          v-if="isEditMode"
          placeholder="Enter post text"
          :user="user"
          :initial-post-values="post"
          @on-submit="onEditPost"
        />
        <PostDetails
          v-else
          :post="post"
          :user="user"
          @on-reply="loadPost"
          @replies-end="loadMoreReplies"
        />
      </div>
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
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { IPostFormData } from '~/types/post-client-types';

const { post, getPost, loadMoreReplies, deletePost, editPost } =
  useSinglePost();
const { useAuthUser } = useAuth();

const user = useAuthUser();

const loading = ref(false);
const isEditMode = ref(false);

const canDelete = computed(() => post.value?.canDelete || false);
const canEdit = computed(() => post.value?.canEdit || false);

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

const onOpenEditForm = () => (isEditMode.value = true);
const onCloseEditForm = () => (isEditMode.value = false);

const onEditPost = async (data: IPostFormData) => {
  loading.value = true;
  await editPost(data);
  onCloseEditForm();
  loading.value = false;
};

onMounted(() => {
  loadPost();
});
</script>

<style scoped>
.action-button {
  @apply dark:hover:bg-white/20 hover:bg-black/20 default-transition p-1 rounded-md;
}
</style>

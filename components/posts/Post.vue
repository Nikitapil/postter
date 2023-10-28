<template>
  <div
    class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300 default-transition cursor-pointer"
  >
    <PostHeader
      :post="post"
      @click.stop
    />

    <div :class="postBodyClasses">
      <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white">
        {{ post.text }}
      </p>
      <div
        v-if="post.mediaFiles"
        class="flex"
      >
        <div
          v-for="image in post.mediaFiles"
          :key="image.id"
          class="flex flex-1 my-3 mr-2 border-2 rounded-2xl max-h-72 justify-center bg-gray-400"
          @click.stop="openImageModal(image.url)"
        >
          <img
            class="rounded-2xl object-cover"
            :src="image.url"
            alt="post image"
          />
        </div>
      </div>

      <div class="mt-2">
        <PostActions
          :post="post"
          @comment-click="openReplyModal"
        />
      </div>
    </div>
  </div>
  <Modal
    v-if="user"
    :is-open="isReplyModalOpen"
    @close-modal="closeReplyModal"
  >
    <PostForm
      :user="user"
      :reply-to-id="post.id"
      @on-success="onReply"
    />
  </Modal>
  <Modal
    v-if="imageForModal && post.mediaFiles?.length"
    :is-open="!!imageForModal"
    @close-modal="closeImageModal"
  >
    <div class="flex justify-center items-center w-full">
      <img
        :src="imageForModal"
        alt="post image"
      />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { IPost } from '~/types/tweet-client-types';
import PostActions from '~/components/posts/PostActions/PostActions.vue';
import PostHeader from '~/components/posts/PostHeader.vue';
import PostForm from '~/components/posts/form/PostForm.vue';
import Modal from '~/components/ui/Modal.vue';
import useAuth from '~/compasables/useAuth';

const { useAuthUser } = useAuth();
const user = useAuthUser();

const props = withDefaults(
  defineProps<{
    post: IPost;
    compact?: boolean;
  }>(),
  {
    compact: false
  }
);

const isReplyModalOpen = ref(false);
const imageForModal = ref<string | null>(null);

const postBodyClasses = computed(() => (props.compact ? 'ml-16' : 'ml-2 mt-4'));

const openReplyModal = () => (isReplyModalOpen.value = true);
const closeReplyModal = () => (isReplyModalOpen.value = false);

const openImageModal = (image: string) => (imageForModal.value = image);
const closeImageModal = () => (imageForModal.value = null);

const onReply = (id: string) => {
  navigateTo(`/status/${id}`);
};
</script>
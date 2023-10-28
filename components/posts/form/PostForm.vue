<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-6"
    >
      <UiSpinner />
    </div>
    <div v-else>
      <PostFormInput
        :user="user"
        :placeholder="placeholder"
        @on-submit="handleFormSubmit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IUser } from '~/types/auth-types';
import { IPostFormData } from '~/types/tweet-client-types';
import usePosts from '~/compasables/usePosts';
import PostFormInput from '~/components/posts/form/PostFormInput.vue';

const props = withDefaults(
  defineProps<{
    user: IUser;
    replyToId?: string | null;
  }>(),
  {
    replyToId: null
  }
);

const emit = defineEmits<{
  onSuccess: [id: string];
}>();

const { createPost } = usePosts();

const loading = ref(false);

const placeholder = computed(() =>
  props.replyToId ? 'Post your reply' : "What's happening?"
);

const handleFormSubmit = async (data: IPostFormData) => {
  loading.value = true;
  if (props.replyToId) {
    data.replyToId = props.replyToId;
  }
  const post = await createPost(data);
  if (post) {
    emit('onSuccess', post.id);
  }
};
</script>

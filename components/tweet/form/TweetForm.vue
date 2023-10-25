<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-6"
    >
      <UiSpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :user="user"
        :placeholder="placeholder"
        @on-submit="handleFormSubmit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IUser } from '~/types/auth-types';
import { IPost, IPostFormData } from '~/types/tweet-client-types';
import useTweets from '~/compasables/usePosts';

const props = withDefaults(
  defineProps<{
    user: IUser;
    replyTo?: IPost | null;
  }>(),
  {
    replyTo: null
  }
);

const emit = defineEmits<{
  onSuccess: [id: string];
}>();

const { createPost } = useTweets();

const loading = ref(false);

const placeholder = computed(() =>
  props.replyTo ? 'Tweet your reply' : "What's happening?"
);

const handleFormSubmit = async (data: IPostFormData) => {
  try {
    loading.value = true;
    if (props.replyTo) {
      data.replyToId = props.replyTo.id;
    }
    const tweet = await createPost(data);
    if (tweet) {
      emit('onSuccess', tweet?.id);
    }
  } catch (e) {
    //TODO handle this error
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>

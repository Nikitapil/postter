<template>
  <form @submit.prevent>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 self-start">
        <UserAvatar :link="user.profileImage" />
      </div>

      <div class="w-full">
        <AppTextArea
          ref="textArea"
          v-model="text"
          :placeholder="placeholder"
          :limit="800"
        />
      </div>
    </div>

    <div class="p-4 pl-16">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(image, index) in inputImageUrls"
          :key="image"
          class="relative overflow-hidden rounded-2xl"
        >
          <button
            class="absolute top-0 right-0 w-7 h-7 hover:bg-gray-200"
            @click="handleDeleteImage(index)"
          >
            <XMarkIcon />
          </button>
          <img
            class="rounded-2xl border max-h-[120px]"
            :src="image"
            alt="uploaded image"
          />
        </div>
      </div>
      <input
        ref="imageInput"
        hidden
        type="file"
        multiple
        accept="image/png, image/gif, image/jpeg"
        :disabled="isImageInputDisabled"
        @change="handleImageChange"
      />
    </div>

    <div class="flex p-2 pl-14">
      <div class="flex gap-1 w-full text-white">
        <button
          class="action-button"
          @click="handleImageClick"
        >
          <ImageUploadIcon />
        </button>

        <div
          ref="emojiPicker"
          class="relative"
          @click.stop="toggleEmojiPicker"
        >
          <button class="action-button">
            <SmileIcon />
          </button>
          <div
            v-if="isShowEmojiPicker"
            class="absolute top-[100%]"
          >
            <EmojiPicker
              native
              hide-search
              disable-skin-tones
              @click.stop
              @select="onSelectEmoji"
            />
          </div>
        </div>
      </div>

      <div class="ml-auto">
        <AppButton
          size="sm"
          :disabled="isDisabled"
          @click="handleFormSubmit"
        >
          Post
        </AppButton>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { IUser } from '~/types/auth-types';
import { IPostFormData } from '~/types/post-client-types';
import AppButton from '~/components/ui/AppButton.vue';
import UserAvatar from '~/components/ui/UserAvatar.vue';
import AppTextArea from '~/components/ui/inputs/AppTextArea.vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import ImageUploadIcon from '~/components/icons/ImageUploadIcon.vue';
import SmileIcon from '~/components/icons/SmileIcon.vue';
import EmojiPicker from 'vue3-emoji-picker';
import { useClickOutside } from '~/composables/useClickOutside';
import { insertIntoString } from '~/helpers/strings';

defineProps<{
  user: IUser;
  placeholder: string;
}>();

const emit = defineEmits<{
  onSubmit: [IPostFormData];
}>();

const imageInput = ref();
const text = ref('');
const selectedFiles = ref<File[]>([]);
const isShowEmojiPicker = ref(false);
const emojiPicker = ref(null);
const textArea = ref<typeof AppTextArea | null>(null);

const isDisabled = computed(() => !text.value.trim());

const inputImageUrls = computed(() =>
  selectedFiles.value.map((file) => URL.createObjectURL(file))
);

const isImageInputDisabled = computed(() => selectedFiles.value.length >= 4);

useClickOutside(() => {
  isShowEmojiPicker.value = false;
}, emojiPicker);

const handleFormSubmit = () => {
  emit('onSubmit', {
    text: text.value,
    mediaFiles: selectedFiles.value
  });
};

const handleImageClick = () => {
  imageInput.value.click();
};

const handleImageChange = (event: InputEvent) => {
  const files = (event.target as HTMLInputElement).files;
  if (files?.length) {
    selectedFiles.value = [...files].slice(0, 4);
  }
};

const handleDeleteImage = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const toggleEmojiPicker = () =>
  (isShowEmojiPicker.value = !isShowEmojiPicker.value);

const onSelectEmoji = (emoji: { i: string }) => {
  const cursorPosition =
    textArea.value?.textAreaRef?.selectionStart || text.value.length;
  text.value = insertIntoString(text.value, emoji.i, cursorPosition);
};
</script>

<style scoped>
.action-button {
  @apply p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer;
}
</style>

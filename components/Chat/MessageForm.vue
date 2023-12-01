<template>
  <form
    class="flex gap-5 w-full items-center px-2 mb-2"
    @submit.prevent="onCreateMessage"
  >
    <!--    TODO add loading and disable textarea and button-->
    <AppTextArea
      v-model="message"
      class="flex-1"
      placeholder="Enter your message"
      :disabled="isLoading"
    />
    <AppButton
      size="sm"
      :disabled="isSendDisabled"
    >
      <PaperAirplaneIcon class="h-6 w-4" />
    </AppButton>
  </form>
</template>
<script setup lang="ts">
import AppTextArea from '~/components/ui/AppTextArea.vue';
import AppButton from '~/components/ui/AppButton.vue';
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  createMessage: [string];
}>();

const message = ref('');

const isSendDisabled = computed(() => props.isLoading || !message.value);

const onCreateMessage = () => {
  emit('createMessage', message.value);
  message.value = '';
};
</script>

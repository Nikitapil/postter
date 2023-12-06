<template>
  <Modal
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
  >
    <h2 class="font-bold text-center mb-2 dark:text-white">
      Send Message to {{ userTo.name }} (@{{ userTo.username }})
    </h2>
    <MessageForm
      :is-loading="isCreateInProgress"
      @create-message="onCreateMessage"
    />
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/ui/Modal.vue';
import MessageForm from '~/components/Chat/MessageForm.vue';
import { IUser } from '~/types/auth-types';

const props = defineProps<{
  isOpen: boolean;
  userTo: IUser;
}>();

defineEmits<{
  closeModal: [];
}>();

const { createMessage } = useMessages();

const isCreateInProgress = ref(false);

const onCreateMessage = async (text: string) => {
  isCreateInProgress.value = true;
  const response = await createMessage({ userToId: props.userTo.id, text });
  if (response) {
    navigateTo(`/chat/${response.message.chatId}`);
  }
  isCreateInProgress.value = false;
};
</script>

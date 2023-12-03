<template>
  <Modal
    :is-open="isOpen"
    @close-modal="$emit('closeModal')"
  >
    <h2 class="text-xl font-bold text-center mb-5">Change Password</h2>
    <form
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit"
    >
      <AppInput
        id="password"
        v-model="currentPassword"
        label="Password"
        placeholder="password"
        type="password"
        :limit="16"
        :disabled="loading"
      />
      <AppInput
        id="new-password"
        v-model="newPassword"
        label="New password"
        placeholder="new password"
        type="password"
        :limit="16"
        :disabled="loading"
      />
      <AppInput
        id="repeat-password"
        v-model="repeatPassword"
        label="Repeat new password"
        placeholder="repeat new password"
        type="password"
        :limit="16"
        :disabled="loading"
      />
      <div class="flex w-full gap-2">
        <button
          class="button bg-red-700"
          type="button"
          @click="$emit('closeModal')"
        >
          Cancel
        </button>
        <button
          class="button bg-blue-500 disabled:opacity-75"
          type="submit"
          :disabled="isSubmitDisabled"
        >
          Confirm
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/ui/Modal.vue';
import AppInput from '~/components/ui/inputs/AppInput.vue';
import { IChangePasswordParams } from '~/types/auth-types';

const props = defineProps<{
  isOpen: boolean;
  loading: boolean;
}>();

const emit = defineEmits<{
  closeModal: [];
  changePassword: [IChangePasswordParams];
}>();

const currentPassword = ref('');
const newPassword = ref('');
const repeatPassword = ref('');

const isSubmitDisabled = computed(
  () =>
    !currentPassword.value ||
    !newPassword.value ||
    !repeatPassword.value ||
    props.loading
);

const onSubmit = () => {
  emit('changePassword', {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    repeatPassword: repeatPassword.value
  });
};
</script>

<style scoped>
.button {
  @apply px-4 py-2 border-none flex-1 outline-none rounded-xl text-white hover:opacity-90 disabled:opacity-50 default-transition cursor-pointer;
}
</style>
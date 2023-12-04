<template>
  <div class="w-full flex flex-col max-h-full overflow-auto">
    <div class="flex justify-center">
      <div class="w-16 h-16">
        <PostterLogo />
      </div>
    </div>

    <form
      class="pt-5 flex flex-col gap-4"
      @submit.prevent
    >
      <AppInput
        id="username"
        v-model="userData.username"
        label="Username"
        placeholder="@username"
        :limit="16"
        :disabled="loading"
      />
      <AppInput
        id="password"
        v-model="userData.password"
        label="Password"
        placeholder="password"
        type="password"
        :limit="16"
        :disabled="loading"
      />

      <template v-if="registeredMode">
        <AppInput
          id="repeatPassword"
          v-model="userData.repeatPassword"
          label="Repeat password"
          placeholder="password"
          type="password"
          :limit="16"
          :disabled="loading"
        />
        <AppInput
          id="email"
          v-model="userData.email"
          label="Email"
          placeholder="your email"
          :limit="30"
          :disabled="loading"
        />
        <AppInput
          id="name"
          v-model="userData.name"
          label="Name"
          placeholder="your name"
          :limit="16"
          :disabled="loading"
        />
        <AppTextArea
          id="profile-info"
          v-model="userData.about"
          use-contrast-colors
          label="Profile information"
          placeholder="Information about you"
          :limit="500"
          :disabled="loading"
        />
        <ProfileImageUploader
          v-model="userData.profileImage"
          :loading="loading"
        />
      </template>

      <AppButton
        liquid
        :disabled="isSubmitDisable"
        @click="handleSubmit"
      >
        {{ submitButtonText }}
      </AppButton>
      <button
        class="hover:underline text-xs text-gray-500 dark:text-gray-300 block ml-auto cursor-pointer disabled:cursor-not-allowed"
        :disabled="loading"
        @click="toggleForm"
      >
        {{ toggleButtonText }}
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import AppInput from '~/components/ui/inputs/AppInput.vue';
import useAuth from '~/composables/useAuth';
import AppButton from '~/components/ui/AppButton.vue';
import PostterLogo from '~/components/icons/PostterLogo.vue';
import { IRegisterData } from '~/types/auth-types';
import AppTextArea from '~/components/ui/inputs/AppTextArea.vue';
import ProfileImageUploader from '~/components/Auth/ProfileImageUploader.vue';

const { login, register } = useAuth();

const userData = ref<IRegisterData>({
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  name: '',
  about: '',
  profileImage: null
});

const loading = ref(false);
const registeredMode = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  if (registeredMode.value) {
    await register(userData.value);
  } else {
    await login(userData.value);
  }
  loading.value = false;
};

const isSubmitDisable = computed(() => {
  const isBaseDisabled =
    loading.value || !userData.value.username || !userData.value.password;

  if (registeredMode.value) {
    return (
      isBaseDisabled ||
      !userData.value.repeatPassword ||
      !userData.value.email ||
      !userData.value.name
    );
  } else {
    return isBaseDisabled;
  }
});

const toggleButtonText = computed(() => {
  return registeredMode.value
    ? 'Already registered? Log in'
    : 'No profile yet? Register';
});

const submitButtonText = computed(() => {
  return registeredMode.value ? 'Create profile' : 'Login';
});

const toggleForm = () => (registeredMode.value = !registeredMode.value);
</script>

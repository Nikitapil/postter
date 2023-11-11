<template>
  <div class="w-full">
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
        :disabled="loading"
      />
      <AppInput
        id="password"
        v-model="userData.password"
        label="Password"
        placeholder="password"
        type="password"
        :disabled="loading"
      />

      <template v-if="registeredMode">
        <AppInput
          id="repeatPassword"
          v-model="userData.repeatPassword"
          label="Repeat password"
          placeholder="password"
          type="password"
          :disabled="loading"
        />
        <AppInput
          id="email"
          v-model="userData.email"
          label="Email"
          placeholder="your email"
          :disabled="loading"
        />
        <AppInput
          id="name"
          v-model="userData.name"
          label="Name"
          placeholder="your name"
          :disabled="loading"
        />
        <AppTextArea
          v-model="userData.about"
          use-contrast-colors
          placeholder="Information about you"
        />
        <input
          id="profile-image"
          type="file"
          hidden
          accept="image/png, image/gif, image/jpeg"
          :disabled="loading"
          @change="handleProfileImageChange"
        />
        <div class="flex w-full justify-between items-center">
          <img
            v-if="profileImageUrl"
            class="w-12 h-12 rounded-full"
            :src="profileImageUrl"
            alt="Your profile avatar"
          />
          <button
            v-if="userData.profileImage"
            class="hover:underline text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white block mr-auto ml-2 default-transition"
            :disabled="loading"
            @click="onDeleteProfileImage"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
          <label
            for="profile-image"
            class="hover:underline w-fit cursor-pointer text-gray-100 dark:text-gray-700 block ml-auto bg-dim-800 dark:bg-white px-4 py-2 rounded-full disabled:cursor-not-allowed"
          >
            Upload profile image
          </label>
        </div>
      </template>

      <AppButton
        class="dark:text-white"
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
import AppInput from '~/components/ui/AppInput.vue';
import useAuth from '~/composables/useAuth';
import AppButton from '~/components/ui/AppButton.vue';
import PostterLogo from '~/components/icons/PostterLogo.vue';
import { IRegisterData } from '~/types/auth-types';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import AppTextArea from '~/components/ui/AppTextArea.vue';

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

const profileImageUrl = computed(() =>
  userData.value.profileImage
    ? URL.createObjectURL(userData.value.profileImage)
    : null
);

const isSubmitDisable = computed(() => {
  if (registeredMode.value) {
    return (
      loading.value ||
      !userData.value.username ||
      !userData.value.password ||
      !userData.value.repeatPassword ||
      !userData.value.email ||
      !userData.value.name
    );
  } else {
    return (
      loading.value || !userData.value.username || !userData.value.password
    );
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

const handleProfileImageChange = (event: InputEvent) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    userData.value.profileImage = file;
  }
};

const onDeleteProfileImage = () => {
  userData.value.profileImage = null;
};
</script>

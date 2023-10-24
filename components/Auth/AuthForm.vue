<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-16 h-16">
        <TwitterLogo />
      </div>
    </div>
    <form
      class="pt-5 space-y-6"
      @submit.prevent
    >
      <AppInput
        v-model="userData.username"
        label="Username"
        placeholder="@username"
      />
      <AppInput
        v-model="userData.password"
        label="Password"
        placeholder="password"
        type="password"
      />

      <template v-if="registeredMode">
        <AppInput
          v-model="userData.repeatPassword"
          label="Repeat password"
          placeholder="password"
          type="password"
        />
        <AppInput
          v-model="userData.email"
          label="Email"
          placeholder="your email"
        />
        <AppInput
          v-model="userData.name"
          label="Name"
          placeholder="your name"
        />
        <input
          id="profile-image"
          type="file"
          hidden
          accept="image/png, image/gif, image/jpeg"
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
            class="hover:underline text-gray-500 dark:text-gray-300 block mr-auto ml-2"
            @click="onDeleteProfileImage"
          >
            x
          </button>
          <label
            for="profile-image"
            class="hover:underline w-fit cursor-pointer text-gray-100 dark:text-gray-700 block ml-auto bg-dim-800 dark:bg-white px-4 py-2 rounded-full"
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
        class="hover:underline text-xs text-gray-500 dark:text-gray-300 block ml-auto"
        @click="toggleForm"
      >
        {{ toggleButtonText }}
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import AppInput from '~/components/ui/AppInput.vue';
import useAuth from '~/compasables/useAuth';
import AppButton from '~/components/ui/AppButton.vue';
import TwitterLogo from '~/components/PostterLogo/PostterLogo.vue';
import { IRegisterData } from '~/types/auth-types';

const { login, register } = useAuth();

const userData = ref<IRegisterData>({
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  name: '',
  profileImage: null
});

const loading = ref(false);
const registeredMode = ref(false);
const profileImageUrl = ref<string | null>('');

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
    const reader = new FileReader();

    reader.onload = (event) => {
      profileImageUrl.value = (event.target?.result as string) || null;
    };

    reader.readAsDataURL(file);
  }
};

const onDeleteProfileImage = () => {
  userData.value.profileImage = null;
  profileImageUrl.value = '';
};
</script>

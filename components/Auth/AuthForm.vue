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
      </template>

      <AppButton
        class="dark:text-white"
        liquid
        :disabled="isSubmitDisable"
        @click="handleLogin"
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

const { login } = useAuth();

const userData = ref({
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  name: ''
});

const loading = ref(false);
const registeredMode = ref(false);

const handleLogin = async () => {
  loading.value = true;
  await login(userData.value);
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
</script>

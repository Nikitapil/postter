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

      <AppButton
        class="dark:text-white"
        liquid
        :disabled="isSubmitDisable"
        @click="handleLogin"
      >
        Login
      </AppButton>
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
  password: ''
});

const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  await login(userData.value);
  loading.value = false;
};

const isSubmitDisable = computed(
  () => loading.value || !userData.value.username || !userData.value.password
);
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <TwitterLogo/>
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <AppInput v-model="userData.username" label="Username" placeholder="@username" />
      <AppInput v-model="userData.password" label="Password" placeholder="password" type="password" />

      <AppButton class="dark:text-white" liquid :disabled="loading" @click="handleLogin">Login</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";
import useAuth from "~/compasables/useAuth";
import AppButton from "~/components/ui/AppButton.vue";
import TwitterLogo from "~/components/logo/TwitterLogo.vue";

const { login } = useAuth()

const userData = ref({
  username: '',
  password: ''
})

const loading = ref(false)


const handleLogin = async () => {
  loading.value = true
  await login(userData.value)
  loading.value = true
}
</script>
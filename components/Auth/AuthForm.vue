<template>
  <div>
    <div class="pt-5 space-y-6">
      <AppInput v-model="userData.username" label="Username" placeholder="@username" />
      <AppInput v-model="userData.password" label="Password" placeholder="password" type="password" />

      <div>
        <button class="dark:text-white" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";
import useAuth from "~/compasables/useAuth";

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
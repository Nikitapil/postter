<template>
  <MainSection title="Edit profile">
    <form @submit.prevent>
      <AppInput
        id="username"
        v-model="userData.username"
        label="Username"
        placeholder="@username"
        :disabled="false"
      />
      <AppInput
        id="email"
        v-model="userData.email"
        label="Email"
        placeholder="your email"
        :disabled="false"
      />
      <AppInput
        id="name"
        v-model="userData.name"
        label="Name"
        placeholder="your name"
        :disabled="false"
      />
      <AppTextArea
        v-model="userData.about"
        use-contrast-colors
        placeholder="Information about you"
      />
    </form>
  </MainSection>
</template>
<script setup lang="ts">
import AppInput from '~/components/ui/AppInput.vue';
import AppTextArea from '~/components/ui/AppTextArea.vue';

const userData = ref({
  username: '',
  email: '',
  name: '',
  about: ''
});
</script>

<template>
  <MainSection
    title="Edit profile"
    :loading="pageLoading"
  >
    <Head>
      <Title>Edit profile / Postter</Title>
    </Head>
    <form
      class="px-5 flex flex-col gap-5"
      @submit.prevent
    >
      <AppInput
        id="username"
        v-model="userData.username"
        label="Username"
        placeholder="@username"
        :limit="16"
        :disabled="formLoading"
      />
      <AppInput
        id="email"
        v-model="userData.email"
        label="Email"
        placeholder="your email"
        :limit="30"
        :disabled="formLoading"
      />
      <AppInput
        id="name"
        v-model="userData.name"
        label="Name"
        placeholder="your name"
        :limit="16"
        :disabled="formLoading"
      />
      <AppTextArea
        id="profile-info"
        v-model="userData.about"
        use-contrast-colors
        label="Profile information"
        placeholder="Information about you"
        :limit="500"
      />
      <ProfileImageUploader
        v-model="userData.profileImage"
        :loading="formLoading"
      />
      <AppButton
        class="dark:text-white"
        liquid
        :disabled="isSubmitDisable"
        @click="handleSubmit"
      >
        Save
      </AppButton>
    </form>
  </MainSection>
</template>
<script setup lang="ts">
import AppInput from '~/components/ui/inputs/AppInput.vue';
import AppTextArea from '~/components/ui/inputs/AppTextArea.vue';
import ProfileImageUploader from '~/components/Auth/ProfileImageUploader.vue';
import AppButton from '~/components/ui/AppButton.vue';
import { createFileFromString } from '~/helpers/files';
import { IEditUserData } from '~/types/auth-types';

const { useAuthUser, editUser } = useAuth();
const user = useAuthUser();

const formLoading = ref(false);
const pageLoading = ref(true);

const userData = ref<IEditUserData>({
  username: '',
  email: '',
  name: '',
  about: '',
  profileImage: null
});

const isSubmitDisable = computed(() => {
  return (
    formLoading.value ||
    !userData.value.username ||
    !userData.value.name ||
    !userData.value.email
  );
});

const handleSubmit = async () => {
  formLoading.value = true;
  await editUser(userData.value);
  formLoading.value = false;
};

onMounted(async () => {
  pageLoading.value = true;
  if (user.value) {
    const { username, name, email, profileImage, about } = user.value;
    const profileImageFile = profileImage
      ? await createFileFromString(profileImage)
      : null;
    userData.value = {
      username,
      name: name || '',
      email,
      profileImage: profileImageFile,
      about
    };
  }
  pageLoading.value = false;
});
</script>

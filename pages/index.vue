<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <TweetForm :user="user" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import useAuth from "~/compasables/useAuth";

const loading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>
<template>
  <div>
    <MainSection title="Home" :loading="loading">
      This our home page
    </MainSection>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
</script>
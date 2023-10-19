<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>
    </MainSection>
  </div>
</template>
<script setup lang="ts">
const loading = ref(false)
</script>
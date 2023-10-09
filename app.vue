<template>
  <div :class="{dark: darkMode}">
    <div class="min-h-full">
      <div class="grid"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(true)
</script>
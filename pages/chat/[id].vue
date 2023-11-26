<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute();

const { chat, getChat } = useSingleChat();

const chatId = computed(() => route.params.id as string);
</script>

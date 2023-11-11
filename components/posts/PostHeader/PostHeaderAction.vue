<template>
  <div class="text-sm">
    <span class="text-gray-500">{{ title }}</span>
    <NuxtLink
      class="text-blue-400"
      :to="link"
    >
      @{{ userName }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  userName: string;
  actionLinkId: string;
}>();

const link = computed(() => `/status/${props.actionLinkId}`);
</script>

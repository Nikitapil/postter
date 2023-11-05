<template>
  <div ref="observerEl"></div>
</template>

<script lang="ts" setup>
const observerEl = ref<Element | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const emit = defineEmits<{
  intersect: [];
}>();

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        emit('intersect');
      }
    },
    {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
    }
  );
  if (observer.value && observerEl.value) {
    observer.value.observe(observerEl.value);
  }
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

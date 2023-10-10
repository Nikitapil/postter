<template>
  <NuxtLink
      class="flex items-center rounded-full gap-4 p-3 w-min hover:bg-gray-200"
      :class="defaultTransition"
      exact-active-class="font-semibold"
      to="/"
  >
    <div class="w-6 h-6 text-dark" >
      <slot name="icon"/>
    </div>
    <div class="text-xl">
      <slot name="name"/>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import useTailwindConfig from "~/compasables/useTailwindConfig";

const { defaultTransition } = useTailwindConfig()
</script>
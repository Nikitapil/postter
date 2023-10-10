<template>
  <div class="h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/10" :class="defaultTransition">
      <NuxtLink class="max-w-fit block" to="#">
        <div class="w-8 h-8">
          <TwitterLogo />
        </div>
      </NuxtLink>
    </div>
    <Tab>
      <template #icon>
        <HomeIcon/>
      </template>
      <template #name>
        Home
      </template>
    </Tab>
  </div>
</template>
<script setup lang="ts">
import TwitterLogo from "~/components/logo/TwitterLogo.vue";
import useTailwindConfig from "~/compasables/useTailwindConfig";
import { HomeIcon } from '@heroicons/vue/24/solid'
import Tab from "~/components/sidebars/left/Tab.vue";

const { defaultTransition } = useTailwindConfig()

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>

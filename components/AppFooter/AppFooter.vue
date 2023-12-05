<template>
  <footer>
    <ul
      v-if="appearance === 'full'"
      class="mx-2 my-4 text-xs text-gray-500 dark:text-gray-300"
    >
      <li class="li-full">
        <button
          class="hover:underline"
          @click="toggleTheme"
        >
          {{ themeText }}
        </button>
      </li>
      <li class="li-full">
        <a
          href="https://github.com/Nikitapil/postter"
          class="hover:underline"
          target="_blank"
        >
          Github
        </a>
      </li>
    </ul>
    <ul v-else>
      <li class="block my-2">
        <button
          class="icons-btn"
          @click="toggleTheme"
        >
          <ThemeIconComponent class="w-8 h-8 dark:text-white" />
        </button>
      </li>
      <li class="my-2 flex justify-center">
        <a
          class="block mr-2 icons-btn"
          href="https://github.com/Nikitapil/postter"
          target="_blank"
        >
          <GithubIcon :is-dark-mode="isDarkMode" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import { LightBulbIcon } from '@heroicons/vue/24/solid';
import { LightBulbIcon as LightBulbIconLight } from '@heroicons/vue/24/outline';
import GithubIcon from '~/components/icons/GithubIcon.vue';

const { toggleTheme, isDarkMode } = useTheme();

withDefaults(
  defineProps<{
    appearance?: 'full' | 'icons';
  }>(),
  {
    appearance: 'full'
  }
);

const themeText = computed(() =>
  isDarkMode.value ? 'Light mode' : 'Dark mode'
);

const ThemeIconComponent = computed(() =>
  isDarkMode.value ? LightBulbIcon : LightBulbIconLight
);
</script>

<style scoped>
.li-full {
  @apply inline-block mx-2;
}

.icons-btn {
  @apply hover:bg-gray-200 p-2 rounded-full default-transition dark:hover:bg-dim-200;
}
</style>

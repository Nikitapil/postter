<template>
  <footer>
    <ul class="mx-2 my-4 text-xs text-gray-500 dark:text-gray-300">
      <li class="inline-block mx-2">
        <button
          class="hover:underline"
          @click.prevent="toggleTheme"
        >
          {{ themeText }}
        </button>
      </li>
      <li class="inline-block mx-2">
        <a
          href="https://github.com/Nikitapil/nuxt-twi-clone"
          class="hover:underline"
          target="_blank"
        >
          Github
        </a>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import useTheme from '~/compasables/useTheme';

const { toggleTheme, isDarkMode } = useTheme();

const themeText = computed(() =>
  isDarkMode.value ? 'Light mode' : 'Dark mode'
);
</script>

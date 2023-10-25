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
        <!--    TODO add link to About page-->
        <a
          href="#"
          class="hover:underline"
        >
          About
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

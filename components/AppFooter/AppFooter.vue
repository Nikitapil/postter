<template>
  <footer>
    <ul
      v-if="appearance === 'full'"
      class="mx-2 my-4 text-xs text-gray-500 dark:text-gray-300"
    >
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
    <ul v-else>
      <li class="block my-2">
        <button @click.prevent="toggleTheme">
          <ThemeIconComponent class="w-8 h-8 dark:text-white" />
        </button>
      </li>
      <!--      TODO add github icon with link here-->
    </ul>
  </footer>
</template>

<script setup lang="ts">
import useTheme from '~/compasables/useTheme';
import { LightBulbIcon } from '@heroicons/vue/24/solid';
import { LightBulbIcon as LightBulbIconLight } from '@heroicons/vue/24/outline';

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

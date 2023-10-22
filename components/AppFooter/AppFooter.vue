<template>
  <footer>
    <ul class="mx-2 my-4 text-xs text-gray-500">
      <li class="inline-block mx-2">
        <button
          class="hover:underline"
          @click.prevent="$emit('toggleTheme')"
        >
          Dark mode
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

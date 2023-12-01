<template>
  <div class="bg-dim-900">
    <div class="h-screen w-full flex items-center justify-center text-white">
      <h1 class="text-[20vw] border-r-8 pr-3 font-bold">404</h1>
      <div class="pl-3">
        <p class="text-[4vw] mb-2">Oops! Page not found</p>
        <NuxtLink
          to="/"
          class="bg-white text-dim-900 text-[2.5vw] py-3 px-4 rounded-full hover:opacity-75 default-transition"
        >
          Go to main
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

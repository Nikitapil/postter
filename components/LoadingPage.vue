<template>
  <div class="flex items-center justify-center h-screen">
    <div class="absolute w-20 h-20 animate-ping">
      <TwitterLogo/>
    </div>
  </div>
</template>
<script lang="ts">

import {defineComponent} from "vue";
import TwitterLogo from "~/components/logo/TwitterLogo.vue";

export default defineComponent({
  components: {TwitterLogo}
})
</script>
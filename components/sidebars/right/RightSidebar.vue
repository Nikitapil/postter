<template>
  <div class="flex flex-col">
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <MagnifyingGlassIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        class="flex items-center w-full pl-12 text-sm font-normal text-gray-800 dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-100 h-9"
        type="text"
        placeholder="Search tweets"
      />
    </div>

    <PreviewCard title="What's happening">
      <PreviewCardItem
        v-for="item in whatsHappeningItems"
        :key="item.id"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ item.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ item.count }}</p>
        </div>
      </PreviewCardItem>
    </PreviewCard>

    <PreviewCard title="Who to follow">
      <PreviewCardItem
        v-for="item in whoToFollowItems"
        :key="item.id"
      >
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="item.image"
              :alt="item.name"
            />

            <div class="flex flex-col ml-2">
              <h2 class="font-bold text-gray-800 text-md dark:text-white">
                {{ item.name }}
              </h2>
              <p class="text-xs text-gray-400">{{ item.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </PreviewCardItem>
    </PreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            @click.prevent="$emit('toggleTheme')"
            >Dark mode</a
          >
        </li>
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            >Privacy policy</a
          >
        </li>
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            >Cookie Police</a
          >
        </li>
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            >Ads info</a
          >
        </li>
        <li class="inline-block mx-2">© 2023 Twitter, Inc.</li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PreviewCard from '~/components/sidebars/right/PreviewCard/PreviewCard.vue';
import PreviewCardItem from '~/components/sidebars/right/PreviewCard/PreviewCardItem.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

defineEmits<{
  toggleTheme: [];
}>();

const search = ref('');

const whatsHappeningItems = ref([
  {
    id: 1,
    title: 'SpaceX',
    count: '18.8k Tweets'
  },
  {
    id: 2,
    title: '#CodingIsFun',
    count: '20k Tweets'
  },
  {
    id: 3,
    title: '#artforall',
    count: '1.8k Tweets'
  }
]);

const whoToFollowItems = ref([
  {
    id: 1,
    name: 'Joe',
    handle: '@Joe',
    image: 'https://loremflickr.com/200/200'
  },
  {
    id: 2,
    name: 'Joe',
    handle: '@Joe',
    image: 'https://loremflickr.com/200/200'
  }
]);

const handleSearch = () => {
  const router = useRouter();
  router.push({
    path: '/search',
    query: {
      q: search.value
    }
  });
};
</script>

<template>
  <div class="flex flex-col">
    <PreviewCard title="What's happening">
      <PreviewCardItem v-for="item in whatsHappeningItems" :key="item.id">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ item.title }}</h2>
          <p class="text-xs text-gray-400">{{ item.count }}</p>
        </div>
      </PreviewCardItem>
    </PreviewCard>

    <PreviewCard title="Who to follow">
      <PreviewCardItem v-for="item in whoToFollowItems" :key="item.id">
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <img class="w-10 h-10 rounded-full" :src="item.image" :alt="item.name">

            <div class="flex flex-col ml-2">
              <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ item.name }}</h2>
              <p class="text-xs text-gray-400">{{ item.handle }}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">Follow</button>
          </div>
        </div>
      </PreviewCardItem>
    </PreviewCard>
  </div>
</template>

<script setup lang="ts">
import PreviewCard from "~/components/sidebars/right/PreviewCard/PreviewCard.vue";
import PreviewCardItem from "~/components/sidebars/right/PreviewCard/PreviewCardItem.vue";

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
  },

])

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
  },

])
</script>
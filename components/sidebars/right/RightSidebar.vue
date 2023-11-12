<template>
  <div class="flex flex-col">
    <SearchForm @search="handleSearch" />

    <PreviewCard
      title="What's happening"
      show-more-link="/trends"
    >
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

    <PreviewCard
      title="Who to follow"
      show-more-link="/trends"
    >
      <PreviewCardItem
        v-for="item in whoToFollowItems"
        :key="item.id"
      >
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <UserAvatar :link="item.profileImage" />

            <div class="flex flex-col ml-2">
              <h2 class="font-bold text-gray-800 text-md dark:text-white">
                {{ item.name }}
              </h2>
              <p class="text-xs text-gray-400">@{{ item.username }}</p>
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
  </div>
</template>

<script setup lang="ts">
import PreviewCard from '~/components/sidebars/right/PreviewCard/PreviewCard.vue';
import PreviewCardItem from '~/components/sidebars/right/PreviewCard/PreviewCardItem.vue';
import SearchForm from '~/components/ui/SearchForm.vue';
import UserAvatar from '~/components/ui/UserAvatar.vue';
import { IUser } from '~/types/auth-types';

// TODO get real data
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

// TODO get real data
const whoToFollowItems = ref<IUser[]>([
  {
    id: '1234',
    name: 'Joe',
    email: 'Joe@Joe.Joe',
    profileImage: 'https://loremflickr.com/200/200',
    username: 'Joe',
    about: ''
  },
  {
    id: '2345',
    name: 'Joe',
    email: 'Joe@Joe.Joe',
    profileImage: 'https://loremflickr.com/200/200',
    username: 'Joe',
    about: ''
  }
]);

const handleSearch = (search: string) => {
  const router = useRouter();
  router.push({
    path: '/search',
    query: {
      q: search
    }
  });
};
</script>

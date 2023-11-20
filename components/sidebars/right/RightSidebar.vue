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
      <UserListItem
        v-for="item in whoToFollowItems"
        :key="item.id"
        :user="item"
      />
    </PreviewCard>
  </div>
</template>

<script setup lang="ts">
import PreviewCard from '~/components/PreviewCard/PreviewCard.vue';
import PreviewCardItem from '~/components/PreviewCard/PreviewCardItem.vue';
import SearchForm from '~/components/ui/SearchForm.vue';
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
    about: '',
    createdAt: ''
  },
  {
    id: '2345',
    name: 'Joe',
    email: 'Joe@Joe.Joe',
    profileImage: 'https://loremflickr.com/200/200',
    username: 'Joe',
    about: '',
    createdAt: ''
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
